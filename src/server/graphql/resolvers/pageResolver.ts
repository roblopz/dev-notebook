import { Resolver, Query, FieldResolver, Root, Arg, Mutation, Ctx } from "type-graphql";
import { PageType, PageNotebookType } from "../types/pageType";

import PageCollection from '../../DAL/collections/pageCollection';
import NotebookCollection from "../../DAL/collections/notebookCollection";
import { CreateOrUpdatePageInput } from "../inputs/createPage";
import { IPage, INote, INotebook } from "../../DAL/models";
import { PagesInput, SortPagesBy } from "../inputs/pages";
import { SortOrder } from "../inputs/common";
import { nameof } from "../../../shared/tsUtil";
import shortid = require("shortid");

const getSearchRgx = search =>
  search.length < 3 ? new RegExp(`^${search}`, 'i') : new RegExp(`${search}`, 'i');

@Resolver(of => PageType)
export class PageResolver {
  @Query(returns => PageType, { nullable: true })
  public async page(@Arg('id') id: string): Promise<PageType> {
    return await PageCollection.findOneAsync<IPage>({ _id: id });
  };

  @Query(returns => [PageType], { nullable: true })
  public async pages(
    @Arg('options', { nullable: true }) options: PagesInput = new PagesInput()
  ): Promise<Array<Omit<PageType, 'notebook'>>> {
    const query: any = {};
    const sort = {} as any;

    const pageSearchVal = options.pageSearch && options.pageSearch.search;
    const pageSearchInProps = options.pageSearch &&
      Object.keys(options.pageSearch || {})
        .filter(k => k !== nameof('search', options.pageSearch) && !!options.pageSearch[k])
        .map(k => k);

    const noteSearchVal = options.noteSearch && options.noteSearch.search;
    const noteSearchInProps = options.noteSearch &&
      Object.keys(options.noteSearch || {})
        .filter(k => k !== nameof('search', options.noteSearch) && !!options.noteSearch[k])
        .map(k => {
          if (k === nameof('code', options.noteSearch))
            return 'snippet.code';
          return k;
        });

    if (pageSearchVal && pageSearchInProps.length) {
      pageSearchInProps.forEach(pageProp => query[pageProp] = getSearchRgx(pageSearchVal));
    } else if (noteSearchVal && noteSearchInProps.length) {
      const noteSearchOr = [];
      noteSearchInProps.forEach(noteProp => noteSearchOr.push({ [noteProp]: getSearchRgx(noteSearchVal) }));
      query.notes = { $elemMatch: { $or: noteSearchOr } };
    }

    if (options.language) {
      if (query.notes)
        query.notes.$elemMatch.$or.push({ 'snippet.language': options.language });
      else
        query.notes = { $elemMatch: { 'snippet.language': options.language }};
    }

    if (options.notebook)
      query.notebook = options.notebook;

    if (options.tags && options.tags.length)
      query.tags = { $in: options.tags };

    if (options.sortBy === SortPagesBy.PageCreatedAt)
      sort.createdAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;
    else if (options.sortBy === SortPagesBy.PageUpdatedAt)
      sort.updatedAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;

    return await new Promise<Array<IPage & { _id: string }>>((resolve, reject) => {
      PageCollection.find<IPage & { _id: string }>(query).sort(sort).skip(options.skip).limit(options.take).exec((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });
  }

  @FieldResolver(of => PageNotebookType)
  public async notebook(@Root() parent: PageType | IPage): Promise<PageNotebookType> {
    // PageType
    if (typeof parent.notebook === 'string') {
      return await NotebookCollection.findOneAsync<INotebook>({ _id: parent.notebook });
    } else { // PageType
      return parent.notebook;
    }
  }

  @Mutation(returns => String)
  public async deletePage(@Arg('id') id: string): Promise<string> {
    await PageCollection.removeAsync<IPage>({ _id: id });
    return 'OK';
  }

  @Mutation(returns => PageType, { nullable: true })
  public async createOrUpdatePage(
    @Arg("page") newPage: CreateOrUpdatePageInput,
    @Arg('id', { nullable: true }) id?: string
  ): Promise<Omit<PageType, 'notebook'>> {
    let targetNotebookExists = true;
    let targetNotebook;

    try {
      // Create notebook if not existent      
      targetNotebook = await NotebookCollection.findOneAsync<INotebook>({
        name: new RegExp(`^${newPage.notebook}$`, 'i')
      });

      if (!targetNotebook) {
        targetNotebookExists = false;
        targetNotebook = await NotebookCollection.insertAsync<INotebook>({
          name: newPage.notebook.trim(),
          createdAt: new Date()
        });
      }

      // Update
      if (id) {
        const targetPage = await PageCollection.findOneAsync<IPage>({ _id: id });
        if (!targetPage)
          throw new Error('page not found to update!');

        await new Promise((resolve, reject) => {
          PageCollection.update({ _id: id }, {
            ...newPage,
            notebook: targetNotebook._id,
            notes: newPage.notes.map<INote>(newNote => {
              const existingNote = targetPage.notes.find(n => n._id === newNote._id);
              return ({
                ...newNote,
                _id: existingNote ? existingNote._id : shortid.generate(),
                createdAt: existingNote ? existingNote.createdAt : new Date(),
                updatedAt: new Date()
              });
            }),
            createdAt: targetPage.createdAt,
            updatedAt: new Date()
          }, { multi: false }, (err) => {
            return err ? reject(err) : resolve();
          });
        });

        return await PageCollection.findOneAsync<IPage>({ _id: id });
      } else { // insert
        const page = await PageCollection.insertAsync<IPage>({
          ...newPage,
          notebook: targetNotebook._id,
          notes: newPage.notes.map<INote>(n => ({
            ...n,
            _id: shortid.generate(),
            createdAt: new Date(),
            updatedAt: new Date() })
          ),
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return page;
      }
    } catch (err) {
      // Rollback notebook creation
      if (!targetNotebookExists) {
        // tslint:disable-next-line no-empty
        NotebookCollection.remove({ _id: targetNotebook._id }, () => { });
      }

      throw err;
    }
  }
}
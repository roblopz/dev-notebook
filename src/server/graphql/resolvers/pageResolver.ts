import { Resolver, Query, FieldResolver, Root, Arg, Mutation, Ctx } from "type-graphql";
import { PageType, PageNotebookType } from "../types/pageType";

import PageCollection from '../../DAL/collections/pageCollection';
import NotebookCollection from "../../DAL/collections/notebookCollection";
import { CreatePageInput } from "../inputs/createPage";
import { IPage, INote, INotebook } from "../../DAL/models";
import { PagesInput, SortPagesBy } from "../inputs/pages";
import { SortOrder } from "../inputs/common";
import { nameof } from "../../../shared/tsUtil";

const getSearchRgx = search =>
  search.length < 3 ? new RegExp(`^${search}`, 'i') : new RegExp(`${search}`, 'i');

@Resolver(of => PageType)
export class PageResolver {
  @Query(returns => [PageType], { nullable: true })
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

    if (options.notebook)
      query.notebook = options.notebook;

    if (options.tags)
      query.tags = { $in: options.tags };
    
    if (options.sortBy === SortPagesBy.PageCreatedAt)
      sort.createdAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;
    else if (options.sortBy === SortPagesBy.PageUpdatedAt)
      sort.updatedAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;

    return await new Promise<Array<IPage & {_id: string}>>((resolve, reject) => {
      PageCollection.find<IPage & {_id: string}>(query).sort(sort).skip(options.skip).limit(options.take).exec((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });
  }

  @FieldResolver(of => PageNotebookType)
  public async notebook(@Root() parent: PageType | IPage): Promise<PageNotebookType> {
    // PageType
    if (typeof parent.notebook === 'string') {
      return await NotebookCollection.findOneAsync<INotebook>({ _id: parent.notebook });
    } else { // PageType
      return parent.notebook;
    }
  }

  @Mutation(returns => PageType, { nullable: true })
  public async createPage(@Arg("page") newPage: CreatePageInput): Promise<Omit<PageType, 'notebook'>> {
    // Create notebook if not existent
    let targetNotebookExists = true;
    let targetNotebook = await NotebookCollection.findOneAsync<INotebook>({
      name: new RegExp(`^${newPage.notebook}$`, 'i')
    });

    if (!targetNotebook) {
      targetNotebookExists = false;
      targetNotebook = await NotebookCollection.insertAsync<INotebook>({
        name: newPage.notebook.trim(),
        createdAt: new Date()
      });
    }

    try {
      const page = await PageCollection.insertAsync<IPage>({
        ...newPage,
        notebook: targetNotebook._id,
        notes: newPage.notes.map<INote>(n => ({ ...n, createdAt: new Date() })),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return page;
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
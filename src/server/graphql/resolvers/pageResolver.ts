import { Resolver, Query, FieldResolver, Root, Arg, Mutation, Ctx } from "type-graphql";
import { PageType, PageNotebookType } from "../types/pageType";

import PageCollection from '../../DAL/collections/pageCollection';
import NotebookCollection from "../../DAL/collections/notebookCollection";
import { CreatePageInput } from "../inputs/createPage";
import { IPage, INote, INotebook } from "../../DAL/models";
import { PagesInput, SortPagesBy } from "../inputs/getPages";
import { SortOrder } from "../inputs/common";

@Resolver(of => PageType)
export class PageResolver {

  @Query(returns => [PageType], { nullable: true })
  public async pages(
    @Arg('options', { nullable: true }) options: PagesInput = new PagesInput()
  ): Promise<Array<Omit<PageType, 'notebook'>>> {
    const query: any = {};
    const sort = {} as any;

    if (options.search) {
      const match = options.search.length < 3 ? new RegExp(`^${options.search}`, 'i') : new RegExp(`${options.search}`, 'i');
      query.title = match;
      // query.notes = {
      //   $elemMatch: {
      //     $or: [{ header: match, subheader: match, 'snippet.code': match }]
      //   }
      // };
    }

    // if (options.language) {
    //   if (options.search)
    //     query.notes.$elemMatch.$or.unshift({ 'snippet.language': options.language });
    //   else
    //     query.notes.$elemMatch = { 'snippet.language': options.language };
    // }

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
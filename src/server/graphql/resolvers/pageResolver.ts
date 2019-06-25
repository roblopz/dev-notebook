import { Resolver, Query, FieldResolver, Root, Arg, Mutation, Ctx } from "type-graphql";
import { PageType, PageNotebookType } from "../types/pageType";
import { NotebookType } from "../types/notebookType";

import PageCollection from '../../DAL/collections/pageCollection';
import NotebookCollection from "../../DAL/collections/notebookCollection";
import { CreatePageInput } from "../inputs/createPage";
import { IPage, INote, INotebook } from "../../DAL/models";

@Resolver(of => PageType)
export class PageResolver {

  @Query(returns => [PageType])
  public async pages(): Promise<Array<Omit<PageType, 'notebook'>>> {
    return await PageCollection.findAsync<IPage>({});
  }

  @FieldResolver(of => NotebookType)
  public async notebook(@Root() parent: IPage): Promise<NotebookType> {
    const notebook = await NotebookCollection.findOneAsync<INotebook>({ _id: parent.notebook });
    return notebook;
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
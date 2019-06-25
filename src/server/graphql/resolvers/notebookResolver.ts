import { Resolver, Query, FieldResolver, Root } from "type-graphql";

import NotebookCollection from '../../DAL/collections/notebookCollection';
import PageCollection from "../../DAL/collections/pageCollection";
import { NotebookType } from "../types/notebookType";
import { PageType } from "../types/pageType";
import { INotebook, IPage } from "../../DAL/models";

@Resolver(of => NotebookType)
export class NotebookResolver {

  @Query(returns => [NotebookType], { nullable: true })
  public async notebooks(): Promise<NotebookType[]> {
    return await NotebookCollection.findAsync<INotebook>({});
  }

  @FieldResolver()
  public async pages(@Root() parent: NotebookType): Promise<PageType[]> {
    const targetPages = await PageCollection.findAsync<IPage>(
      { _id: { $in: parent.pages.map(p => p._id) } }
    );

    return targetPages.map<PageType>(p => ({ ...p, notebook: parent }));
  }
}
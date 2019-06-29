import { Resolver, Query, FieldResolver, Root, Arg, Int } from "type-graphql";

import NotebookCollection from '../../DAL/collections/notebookCollection';
import PageCollection from "../../DAL/collections/pageCollection";
import { NotebookType } from "../types/notebookType";
import { PageType } from "../types/pageType";
import { INotebook, IPage } from "../../DAL/models";

@Resolver(of => NotebookType)
export class NotebookResolver {

  @Query(returns => [NotebookType], { nullable: true })
  public async notebooks(
    @Arg('name', { nullable: true }) name?: string,
    @Arg('sort', type => Int, { nullable: true, defaultValue: 1 }) sort?: number
  ): Promise<NotebookType[]> {
    const query = {} as any;
    if (name) {
      if (name.length < 3)
        query.name = { $regex: new RegExp(`^${name}`, 'i') };
      else
        query.name = { $regex: new RegExp(name, 'i') };
    }

    return await new Promise((resolve, reject) => {
      NotebookCollection.find<INotebook & { _id: string }>(query).sort({ name: sort !== -1 ? 1 : sort }).exec((err, docs) => {
        err ? reject(err) : resolve(docs || []);
      });
    });
  }

  @FieldResolver()
  public async pages(@Root() parent: NotebookType): Promise<PageType[]> {
    const targetPages = await PageCollection.findAsync<IPage>({ notebook: parent._id });
    return targetPages.map<PageType>(p => ({ ...p, notebook: { _id: '123', name: '123' } }));
  }
}
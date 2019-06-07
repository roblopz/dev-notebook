import { Resolver, Query, FieldResolver, Root } from "type-graphql";

import { notebooks, pages } from '../../data';
import { Notebook } from "../types/notebook";
import { Page } from "../types/page";
import { Note } from "../types/note";

@Resolver(of => Notebook)
export class NotebookResolver {

  @Query(returns => [Notebook], { nullable: true })
  public notebooks(): Notebook[] {
    return notebooks;
  }

  @FieldResolver()
  public pages(@Root() notebook: Notebook): Page[] {
    const res: Page[] = [];

    notebook.pages.forEach(np => {
      if (typeof np === 'string') {
        const page = pages.find(p => p._id === np);
        res.push(page);
      } else {
        res.push(np);
      }
    });

    return res;
  }
}
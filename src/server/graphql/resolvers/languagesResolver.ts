import { Resolver, Query } from "type-graphql";

import PageCollection from "../../DAL/collections/pageCollection";
import { IPage } from "../../DAL/models";
import { TagsType } from "../types/tagsType";

@Resolver(of => TagsType)
export class LanguagesResolver {

  @Query(returns => [String])
  public async allLanguages(): Promise<string[]> {
    const res: string[] = [];
    const pages = await PageCollection.findAsync<IPage>({}, { notes: 1 });
    pages.forEach(p => p.notes.forEach(n => {
      if (n.snippet && n.snippet.language && !res.includes(n.snippet.language))
        res.push(n.snippet.language);
    }));

    return res.sort((a, b) => a.localeCompare(b));
  }
}
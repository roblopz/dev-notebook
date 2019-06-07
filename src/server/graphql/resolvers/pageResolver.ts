import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";
import { Page } from "../types/page";
import { Notebook } from "../types/notebook";

import { pages, notebooks } from '../../data';
import { PageFilterInput } from "../inputs/pageInputs";
import { PaginateInput } from "../inputs/commonInputs";

@Resolver(of => Page)
export class PageResolver {
  @Query(returns => [Page], { nullable: true })
  public pages(
    @Arg('filter', { nullable: true }) pageFilter: PageFilterInput,
    @Arg('pagination', { nullable: true }) pagination: PaginateInput
  ): Page[] {
    return pages;
  }

  @FieldResolver()
  public notebook(@Root() page: Page): Notebook {
    if (typeof page.notebook === 'string') {
      return notebooks.find(n => n._id === page.notebook);
    } else {
      return page.notebook;
    }
  }

  @Query(returns => [String], { nullable: true })
  public allPageTags(): string[] {
    const allTags = pages.reduce((acc, curr) => {
      acc.push(...curr.tags);
      return acc;
    }, []);

    return allTags.filter((l, idx, self) => self.indexOf(l) === idx);
  }
}
import { Resolver, Query, Arg, Int, Args } from "type-graphql";

import PageCollection from "../../DAL/collections/pageCollection";
import { IPage } from "../../DAL/models";
import { TagsType } from "../types/tagsType";
import { FindTagsInput, SortTagsBy } from "../inputs/findTags";
import { SortOrder } from "../inputs/common";

@Resolver(of => TagsType)
export class TagsResolver {

  @Query(returns => TagsType, { nullable: true })
  public async getTag(
    @Arg('tag') tag: string
  ): Promise<TagsType> {
    const query = {
      tags: {
        $exists: true,
        $in: [tag]
      }
    };

    const matchingPages = await PageCollection.findAsync<IPage>(query);
    return matchingPages.length ? { tag, pages: matchingPages } : null;
  }

  @Query(returns => [TagsType], { nullable: true })
  public async findTags(
    @Arg('options', { nullable: true }) options: FindTagsInput = new FindTagsInput()
  ): Promise<TagsType[]> {
    let match: RegExp = null;

    if (options.search)
      match = options.search.length < 3 ? new RegExp(`^${options.search}`, 'i') : new RegExp(`${options.search}`, 'i');

    const query = {
      tags: { $exists: true },
      $where() {
        return !match || this.tags.some(t => match.test(t));
      }
    };

    const sort = {} as any;
    if (options.sortBy === SortTagsBy.PageCreatedAt)
      sort.createdAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;
    else if (options.sortBy === SortTagsBy.PageUpdatedAt)
      sort.updatedAt = options.sortOrder === SortOrder.Ascending ? 1 : -1;

    const matchingPages = await new Promise<Array<IPage & {_id: string}>>((resolve, reject) => {
      PageCollection.find<IPage & {_id: string}>(query).sort(sort).skip(options.skip).limit(options.take).exec((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });

    const resTags: string[] = [];

    mainLoop: for (const p of matchingPages) {
      for (const tag of p.tags) {
        if (!match || (match.test(tag) && !resTags.includes(tag)))
          resTags.push(tag);

        if (resTags.length >= options.take) break mainLoop;
      }
    }

    // Sort alphabetically
    resTags.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);

    return resTags.map<TagsType>(tag => ({
      tag, pages: matchingPages.filter(p => p.tags.includes(tag))
    }));
  }
}
import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";

import { pages } from '../../data';
import { Note } from "../types/note";

@Resolver(of => Note)
export class NoteResolver {
  @Query(returns => [Note], { nullable: true })
  public notes(@Arg('pageID') pageID: string): Note[] {
    return pages.find(p => p._id === pageID).notes;
  }

  @Query(returns => [String], { nullable: true })
  public allNoteLanguages(): string[] {
    const allLangs = pages.reduce((acc, curr) => {
      const pageLanguages = curr.notes.map(n => n.snippet && n.snippet.language).filter(l => !!l);
      acc.push(...pageLanguages);
      return acc;
    }, []);

    return allLangs.filter((l, idx, self) => self.indexOf(l) === idx);
  }
}
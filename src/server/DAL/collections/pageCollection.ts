import { BuildDataStore } from '../dataStoreBuilder';
import faker from 'faker';
import { IPage, INote, INotebook } from '../models';
import moment from 'moment';
import NotebookCollection from '../collections/notebookCollection';

const PageCollection = BuildDataStore('pages');

const getRandomBool = () => Math.random() >= 0.5;

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomPositiveInt = (equalOrBelowTo: number) => Math.floor(Math.random() * equalOrBelowTo) + 1;
const getRandomInt = (equalOrBelowTo: number) => Math.floor(Math.random() * equalOrBelowTo);
// tslint:disable-next-line
const noteContent = '{"blocks":[{"key":"3onjc","text":"Hola! So here\'s the deal, between open source and my day job and life and what not, I have a lot to manage, so I use a GitHub bot to automate a few things here and there. This particular GitHub bot is going to mark this as stale because it has not had recent activity for a while. It will be closed if no further activity occurs in a few days. Do not take this personally--seriously--this is a completely automated action. If this is a mistake, just make a comment, DM me, send a carrier pidgeon, or a smoke signal.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const seed = false;

(async () => {
  const isFilled = !!(await PageCollection.findOneAsync({}));
  if (!isFilled && seed) {

    const notebooksLength = 3;
    const notebookNames = [];
    for (let i = 0; i <= notebooksLength; i++) {
      notebookNames.push(faker.lorem.word());
    }

    for (let i = 0; i < 10; i++) {
      const notes: INote[] = [];
      const tags: string[] = [];

      const notesLength = getRandomPositiveInt(10);

      for (let i = 0; i < notesLength; i++) {
        const newNote: Partial<INote> = {
          header: faker.lorem.words(),
          hideContent: getRandomBool(),
          hideSnippet: getRandomBool(),
          createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date())
        };

        if (getRandomBool())
          newNote.content = noteContent;

        if (getRandomBool())
          newNote.subheader = faker.lorem.words();

        if (getRandomBool())
          newNote.snippet = {
            code: faker.lorem.paragraph(),
            language: 'plaintext'
          };

        if (getRandomBool())
          newNote.updatedAt = getRandomDate(newNote.createdAt, new Date());

        notes.push(newNote as INote);
      }

      const tagsLength = getRandomPositiveInt(10);
      for (let i = 0; i < tagsLength; i++)
        tags.push(faker.lorem.word());

      const newPage: Partial<IPage> = {
        title: faker.lorem.words(),
        createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date()),
        notes,
        tags
      };

      if (getRandomBool())
        newPage.updatedAt = getRandomDate(moment().subtract(100, 'days').toDate(), new Date());
      
      const notebookName = notebookNames[getRandomInt(notebooksLength - 1)];
      let notebook = await NotebookCollection.findOneAsync<INotebook>({ name: notebookName });
      if (!notebook) {
        const newNotebook: INotebook = {
          name: notebookName,
          createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date())
        };

        if (getRandomBool())
          newNotebook.updatedAt = getRandomDate(moment().subtract(100, 'days').toDate(), new Date());

        notebook = await NotebookCollection.insertAsync<INotebook>(newNotebook);
      }

      newPage.notebook = notebook._id;

      await PageCollection.insertAsync(newPage);
    }
  }
})();

export default PageCollection;
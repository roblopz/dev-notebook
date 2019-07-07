import { BuildDataStore } from '../dataStoreBuilder';
import faker from 'faker';
import { IPage, INote, INotebook } from '../models';
import moment from 'moment';
import NotebookCollection from '../collections/notebookCollection';
import shortid = require('shortid');

const PageCollection = BuildDataStore('pages');

const getRandomBool = () => Math.random() >= 0.5;

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomPositiveInt = (equalOrBelowTo: number) => Math.floor(Math.random() * equalOrBelowTo) + 1;
const getRandomInt = (equalOrBelowTo: number) => Math.floor(Math.random() * equalOrBelowTo);
// tslint:disable-next-line

const seed = true;

(async () => {
  // const isFilled = !!(await PageCollection.findOneAsync({}));
  const pages = await PageCollection.findAsync<IPage>({});

  if (pages.length === 1 && seed) {
    const samplePage = pages[0];

    for (let i = 0; i < 100; i++) {
      await new Promise(resolve => {
        setTimeout(resolve, 10);
      });

      const newPage: IPage = {
        _id: shortid.generate(),
        title: 'page ' + (100 - i),
        createdAt: new Date(),
        updatedAt: new Date(),
        notebook: samplePage.notebook,
        notes: samplePage.notes.map<INote>(n => {
          return {
            ...n,
            _id: shortid.generate(),
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }),
        tags: samplePage.tags
      };

      await PageCollection.insertAsync(newPage);
    }
  }

  console.log('done');
})();

export default PageCollection;

// const notebooksLength = 3;
//     const notebookNames = [];
//     for (let i = 0; i <= notebooksLength; i++) {
//       notebookNames.push(faker.lorem.word());
//     }

//     for (let i = 0; i < 10; i++) {
//       const notes: INote[] = [];
//       const tags: string[] = [];

//       const notesLength = getRandomPositiveInt(10);

//       for (let i = 0; i < notesLength; i++) {
//         const newNote: Partial<INote> = {
//           header: faker.lorem.words(),
//           createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date())
//         };

//         if (getRandomBool())
//           newNote.content = noteContent;

//         if (getRandomBool())
//           newNote.subheader = faker.lorem.words();

//         if (getRandomBool())
//           newNote.snippet = {
//             code: faker.lorem.paragraph(),
//             language: 'plaintext'
//           };

//         if (getRandomBool())
//           newNote.updatedAt = getRandomDate(newNote.createdAt, new Date());

//         notes.push(newNote as INote);
//       }

//       const tagsLength = getRandomPositiveInt(10);
//       for (let i = 0; i < tagsLength; i++)
//         tags.push(faker.lorem.word());

//       const newPage: Partial<IPage> = {
//         title: faker.lorem.words(),
//         createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date()),
//         notes,
//         tags
//       };

//       if (getRandomBool())
//         newPage.updatedAt = getRandomDate(moment().subtract(100, 'days').toDate(), new Date());
      
//       const notebookName = notebookNames[getRandomInt(notebooksLength - 1)];
//       let notebook = await NotebookCollection.findOneAsync<INotebook>({ name: notebookName });
//       if (!notebook) {
//         const newNotebook: INotebook = {
//           name: notebookName,
//           createdAt: getRandomDate(moment().subtract(100, 'days').toDate(), new Date())
//         };

//         if (getRandomBool())
//           newNotebook.updatedAt = getRandomDate(moment().subtract(100, 'days').toDate(), new Date());

//         notebook = await NotebookCollection.insertAsync<INotebook>(newNotebook);
//       }

//       newPage.notebook = notebook._id;

//       await PageCollection.insertAsync(newPage);
//     }
//   }
import moment from 'moment';
import shortid from 'shortid';

import { INotebook } from "./definitions";

const _notebooks: INotebook[] = [];

for (let i = 0; i < 100; i++) {
  _notebooks.push({
    _id: shortid.generate(),
    name: `Notebook ${i + 1}`,
    createdAt: moment().subtract(i, 'hours').toDate()
  });
}

export const notebooks = _notebooks;
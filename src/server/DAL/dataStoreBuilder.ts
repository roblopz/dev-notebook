import Datastore, { DataStoreOptions } from 'nedb';
import util from 'util';

import appSettings from '../../appSettings';

export interface IAsyncDataStore extends Datastore {
  findAsync<T>(query: Partial<{ [K in keyof T]: any }>, projection?: unknown): Promise<[T & { _id: string }]>;
  findOneAsync<T>(query: Partial<{ [K in keyof T]: any }>, projection?: unknown): Promise<T & { _id: string }>;
  insertAsync<T>(newDocs: T): Promise<T & { _id: string }>;
  removeAsync<T>(query: Partial<{ [K in keyof T]: any }>): Promise<number>;
}

(Datastore.prototype as any).findOneAsync = util.promisify(Datastore.prototype.findOne);
(Datastore.prototype as any).insertAsync = util.promisify(Datastore.prototype.insert);
(Datastore.prototype as any).findAsync = util.promisify(Datastore.prototype.find);
(Datastore.prototype as any).removeAsync = util.promisify(Datastore.prototype.remove);

export function BuildDataStore(collection: string, autoload = true) {
  const ds = new Datastore({
    filename: `${appSettings.PERSISTANCE_PATH}/${collection}`,
    autoload,
    compareStrings: (a, b) => (a || '').localeCompare((b || ''))
  } as DataStoreOptions & { compareStrings: (a: string, b: string) => number });

  return ds as IAsyncDataStore;
}
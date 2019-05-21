import {
  IAppState,
  IStateData,
  IPage,
  INotebook
} from './definitions';

import { notebooks } from './testInitialState';

function getDefaultState<T>(value: T | null): IStateData<T> {
  return {
    value,
    loading: false,
    rawError: null,
    validationErrors: null
  };
}

export const initialState: IAppState = {
  currentPage: getDefaultState<IPage>(null),
  notebooks: getDefaultState<INotebook[]>(notebooks),
  pages: getDefaultState<IPage[]>(null)
};
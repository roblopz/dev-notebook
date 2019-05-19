import {
  IAppState,
  IStateData,
  IPage,
  INotebook
} from './definitions';

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
  notebooks: getDefaultState<INotebook[]>(null),
  pages: getDefaultState<IPage[]>(null)
};
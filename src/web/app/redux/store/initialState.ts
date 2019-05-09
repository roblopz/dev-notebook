import {
  IAppState,
  IStateData
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
  currentPage: getDefaultState(null),
  notebooks: getDefaultState(null),
  pages: getDefaultState(null)
};
import { combineReducers } from 'redux';

import { IAppState } from '../store/definitions';
import { currentPageReducer } from '../reducers/currentPageReducer';

export default combineReducers<Partial<IAppState>>({
  currentPage: currentPageReducer
});
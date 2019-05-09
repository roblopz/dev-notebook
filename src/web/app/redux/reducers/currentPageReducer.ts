import { initialState } from '../store/initialState';
import { IStateData, IPage } from '../store/definitions';
import { cloneState } from '../util/state';

import {
  CurrentPageActions,
  SET_CURRENT_PAGE
} from '../actions/currentPage';

export function currentPageReducer(
  state = initialState.currentPage,
  action: CurrentPageActions
): IStateData<IPage> {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return cloneState(state, action.page);
    }

    default:
      return state;
  }
}
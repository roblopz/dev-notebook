import { IPage } from '../store/definitions';
import { IActionBase } from './definitions';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

interface ISetCurrentPageAction extends IActionBase {
  type: typeof SET_CURRENT_PAGE;
  page: IPage;
}

export const setCurrentPage = (page: IPage): ISetCurrentPageAction =>
  ({ type: SET_CURRENT_PAGE, page });

export type CurrentPageActions = ISetCurrentPageAction;
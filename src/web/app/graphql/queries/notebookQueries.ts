import gql from 'graphql-tag';
import { INotebook } from '../../models';
import { OptionalExceptFor } from '../../lib/tsUtil';

export type INotebookListItem = OptionalExceptFor<INotebook, '_id' | 'name'>;

export interface IGetNotebookListData {
  notebooks: INotebookListItem[];
}

export const GET_NOTEBOOK_LIST = gql`
  {
    notebooks {
      _id,
      name
    }
  }
`;
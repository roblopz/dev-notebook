import { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { IActionBase } from '../redux/actions/types';

export type UseReduxStateMapStateToProps<TReduxState, TRes> = (state: TReduxState) => TRes;

export const useReduxState = <TReduxState, TRes>(
  mapStateToProps: UseReduxStateMapStateToProps<TReduxState, TRes>,
  inputs = []
) => useMappedState(useCallback(mapStateToProps, inputs));

export function useReduxDispatch() {
  const __dispatch = useDispatch();

  const dispatch = <TAction extends IActionBase>(action: TAction) => __dispatch(action);
  const dispatchAsync = <TAction extends IActionBase, TRes>(action: TAction) => new Promise<TRes>((resolve, reject) => {
    __dispatch({ ...action, resolve, reject });
  });

  return { dispatch, dispatchAsync };
}
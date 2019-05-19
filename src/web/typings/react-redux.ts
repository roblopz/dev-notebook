import { IAppState } from '../app/redux/store/definitions';

export * from 'react-redux';

declare module "react-redux" {
  export function useSelector<TState = IAppState, TSelected = {}>(
    selector: (state: TState) => TSelected,
    deps?: ReadonlyArray<any>
  ): TSelected;
}
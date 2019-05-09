import { IStateData, ValidationError } from '../store/definitions';

export function getShallowClonedValue(val: any) {
  if (Array.isArray(val))
    return [...val];
  else if (typeof val === 'object')
    return Object.assign({}, val);
  else
    return val;
}

export function getValidationErrors(
  error: Error = new Error('State update failed')
): ValidationError[] {
  return [];
}

export function getOnAsyncStartState<T>(state: IStateData<T>, newValue?: T): IStateData<T> {
  const newState: IStateData<T> = {
    loading: true,
    rawError: null,
    validationErrors: null,
    value: state.value
  };

  if (newValue !== undefined) {
    newState.value = state.value === newValue ? getShallowClonedValue(newValue) : newValue;
  }

  return newState;
}

export function getOnAsyncSuccessState<T>(state: IStateData<T>, newValue?: T): IStateData<T> {
  const newState: IStateData<T> = {
    loading: false,
    rawError: null,
    validationErrors: null,
    value: state.value
  };

  if (newValue !== undefined) {
    newState.value = state.value === newValue ? getShallowClonedValue(newValue) : newValue;
  }

  return newState;
}

export function getOnAsyncFailState<T>(state: IStateData<T>, error: Error, newValue?: T): IStateData<T> {
  const newState: IStateData<T> = {
    loading: false,
    rawError: error,
    validationErrors: getValidationErrors(error),
    value: state.value
  };

  if (newValue !== undefined) {
    newState.value = state.value === newValue ? getShallowClonedValue(newValue) : newValue;
  }

  return newState;
}

export function cloneState<T>(state: IStateData<T>, newValue?: T): IStateData<T> {
  const newState = Object.assign({}, state);

  if (newValue !== undefined) {
    newState.value = state.value === newValue ? getShallowClonedValue(newValue) : newValue;
  }

  return newState;
}
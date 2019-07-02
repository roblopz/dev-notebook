
export type KeyValueOf<T> = {
  [K in keyof T]: T[K];
};

export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
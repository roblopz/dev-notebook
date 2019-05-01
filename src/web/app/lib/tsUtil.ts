
export type KeyValueOf<T> = {
  [K in keyof T]: T[K];
};

export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}
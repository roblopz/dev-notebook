import { ApolloLink } from "apollo-link";

const omitDeepArrayWalk = (arr: any[], key: string): any[] => {
  return arr.map((val) => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    else if (typeof val === 'object') return omitDeep(val, key);
    return val;
  });
};

export const omitDeep = (obj: any, key: string) => {
  const keys = Object.keys(obj);
  const newObj = {};

  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i];
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });

  return newObj;
};

export const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, "__typename");
  }

  return forward(operation).map((data) => {
    return data;
  });
});
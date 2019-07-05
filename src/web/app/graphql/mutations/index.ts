
import { setPageFiltersResolver } from './setPageFilters';
import { setPagesCountResolver } from './setPagesCount';

export const mutationResolvers = {
  ...setPageFiltersResolver,
  ...setPagesCountResolver
};
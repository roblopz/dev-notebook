import { ApolloClient, OperationVariables } from "apollo-client";
import { DataProxy } from "apollo-cache";

export type IResolver<T = {}> = (_root: any, variables: T, context: IResolverContext<T>, info: any) => any | void;

export interface IResolverContext<T = object> {
  client: ApolloClient<T>;
  cache: {
    readQuery<T = any, TVariables = OperationVariables>(options: DataProxy.Query<TVariables>, optimistic?: boolean): T | null;
    writeQuery<TData = any, TVariables = OperationVariables>(options: DataProxy.WriteQueryOptions<TData, TVariables>): void;
    readFragment<T = any, TVariables = OperationVariables>(options: DataProxy.Fragment<TVariables>, optimistic?: boolean): T | null;
    writeFragment<TData = any, TVariables = OperationVariables>(options: DataProxy.WriteFragmentOptions<TData, TVariables>): void;
    writeData<TData = any>(options: DataProxy.WriteDataOptions<TData>): void;
  };
  getCacheKey: ({ __typename, id }: { __typename?: string, id?: string }) => any;
  [prop: string]: any;
}
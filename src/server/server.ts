import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";

import appSettings from './appSettings';
import Resolvers from './graphql/resolvers';

import { initDBs } from './DAL/initDBs';
initDBs();

const app = express();

(async () => {
  const schema = await buildSchema({
    resolvers: Resolvers,
    emitSchemaFile: true
  });

  const apolloServer = new ApolloServer({
    schema
  });

  app.set('port', appSettings.APP_PORT);
  apolloServer.applyMiddleware({ app });

  app.listen(app.get('port'), () => {
    const currentEnv = appSettings.ENV;
    const appAddress = `http://localhost:${app.get('port')}`;

    // tslint:disable-next-line no-console
    console.log(`  App is running at ${appAddress} in ${currentEnv} mode`);

    // tslint:disable-next-line no-console
    console.log(`  GraphQL running at ${appAddress}${apolloServer.graphqlPath}`);
  });
})();
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { app as electronApp } from 'electron';

import appSettings from '../appSettings';
import Resolvers from './graphql/resolvers';

import { initDBs } from './DAL/initDBs';
import { Server } from "http";

initDBs();

const app = express();

export const init = () => new Promise<Server>(async (resolve, reject) => {
  try {
    const schema = await buildSchema({
      resolvers: Resolvers,
      emitSchemaFile: appSettings.NODE_ENV === 'development'
    });

    const apolloServer = new ApolloServer({
      schema
    });

    app.set('port', appSettings.APP_PORT);
    apolloServer.applyMiddleware({ app });

    const server = app.listen(app.get('port'), () => {
      const currentEnv = appSettings.NODE_ENV;
      const appAddress = `http://localhost:${app.get('port')}`;

      // tslint:disable-next-line no-console
      console.log(`  App is running at ${appAddress} in ${currentEnv} mode`);

      // tslint:disable-next-line no-console
      console.log(`  GraphQL running at ${appAddress}${apolloServer.graphqlPath}`);

      resolve(server);
    });
  } catch (err) {
    return reject(err);
  }
});

if (!electronApp)
  init();
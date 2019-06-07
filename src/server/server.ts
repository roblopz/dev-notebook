import "reflect-metadata";
import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";

import Resolvers from './graphql/resolvers';

const app = express();
const originalSourceWorkdir = path.resolve(process.cwd(), './src/server/');
app.set('originalSourceWorkdir', originalSourceWorkdir);

dotenv.config({
  path: path.resolve(originalSourceWorkdir, `./env/${process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env'}`)
});

(async () => {
  const schema = await buildSchema({
    resolvers: Resolvers,
    emitSchemaFile: true
  });

  const apolloServer = new ApolloServer({
    schema
  });

  app.set('port', process.env.APP_PORT);
  apolloServer.applyMiddleware({ app });

  app.listen(app.get('port'), () => {
    const currentEnv = app.get('env');
    const appAddress = `http://localhost:${app.get('port')}`;

    // tslint:disable-next-line no-console
    console.log(`  App is running at ${appAddress} in ${currentEnv} mode`);

    // tslint:disable-next-line no-console
    console.log(`  GraphQL running at ${appAddress}${apolloServer.graphqlPath}`);
  });
})();
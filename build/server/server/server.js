"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const app = express_1.default();
const originalSourceWorkdir = path_1.default.resolve(process.cwd(), './src/server/');
app.set('originalSourceWorkdir', originalSourceWorkdir);
dotenv_1.default.config({
    path: path_1.default.resolve(originalSourceWorkdir, `./env/${process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env'}`)
});
(() => __awaiter(this, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: resolvers_1.default,
        emitSchemaFile: true
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
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
}))();
//# sourceMappingURL=server.js.map
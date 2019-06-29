import "regenerator-runtime/runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import { client } from './app/graphql';
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MainTheme } from './app/styles/material/theme';

// Styles
import './app/styles/index.scss';

// Components
import AppIndex from './app/appIndex';

const Root = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <ThemeProvider theme={MainTheme}>
        <HashRouter>
          <CssBaseline />
          <AppIndex />
        </HashRouter>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
import "regenerator-runtime/runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { client } from './app/graphql';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MainTheme } from './app/styles/material/theme';
// Styles
import './app/styles/index.scss';
// Components
import AppIndex from './app/appIndex';
var Root = function () { return (React.createElement(ApolloProvider, { client: client },
    React.createElement(ApolloHooksProvider, { client: client },
        React.createElement(ThemeProvider, { theme: MainTheme },
            React.createElement(BrowserRouter, null,
                React.createElement(CssBaseline, null),
                React.createElement(AppIndex, null)))))); };
ReactDOM.render(React.createElement(Root, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map
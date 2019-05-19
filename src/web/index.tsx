import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { store } from './app/redux/store/configureStore';
import { MainTheme } from './app/styles/material/theme';

// Styles
import './app/styles/index.scss';

// Components
import AppIndex from './app/appIndex';

const Root = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <CssBaseline />
        <AppIndex />
      </BrowserRouter>
    </ThemeProvider>
  </ReduxProvider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
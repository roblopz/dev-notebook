import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import MainIndex from './ui/main/mainIndex';
import EditPageIndex from './ui/pageEdit/pageEditIndex';
import NotebooksIndex from './ui/notebooks/notebooksIndex';
import CurrentTheme from './ui/currentTheme/currentTheme';
import { appRoutes } from './lib/routes';

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path={appRoutes.index} component={MainIndex} />
        <Route exact path={appRoutes.theme} component={CurrentTheme} />
        <Route exact path={appRoutes.addPage} component={EditPageIndex} />
        <Route exact path={appRoutes.editPageRoot} component={EditPageIndex} />
        <Route exact path={appRoutes.notebooks} component={NotebooksIndex} />
        <Redirect to={appRoutes.index} />
      </Switch>
    );
  }
}

export default hot(App);
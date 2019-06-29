import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Main from './ui/main';
import EditMode from './ui/editMode';
import CurrentTheme from './ui/currentTheme';
import { appRoutes } from './lib/routes';

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path={appRoutes.theme} component={CurrentTheme} />
        <Route exact path={appRoutes.addPage} component={EditMode} />
        <Route component={Main} />
      </Switch>
    );
  }
}

export default hot(App);
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

// Components
import Main from './components/main/main';
import CurrentTheme from './components/currentTheme/currentTheme';

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/theme" component={CurrentTheme} />
      </Switch>
    );
  }
}

export default hot(App);
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

// Components
import Page from './components/page/page';
import CurrentTheme from './components/currentTheme/currentTheme';
import TestEditor from './components/test';

class App extends React.Component {
  public render() {
    return (
      <div style={{ width: '70%', margin: '0 auto', marginTop: '25px' }}>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route exact path="/theme" component={CurrentTheme} />
        <Route exact path="/editor" component={TestEditor} />
      </Switch>
      </div>
    );
  }
}

export default hot(App);
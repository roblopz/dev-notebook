import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

// Components
import Page from './components/page/page';
import CurrentTheme from './components/currentTheme/currentTheme';

class App extends React.Component {
  public render() {
    return (
      <div style={{ width: '85%', margin: '0 auto', marginTop: '25px' }}>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route exact path="/theme" component={CurrentTheme} />
      </Switch>
      </div>
    );
  }
}

export default hot(App);
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';

// Components
import Main from './components/main/main';
import CurrentTheme from './components/currentTheme/currentTheme';
import PageEditModal from './components/pageEdit/pageEditModal';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/theme" component={CurrentTheme} />
        </Switch>
        <PageEditModal />
      </React.Fragment>
    );
  }
}

export default hot(App);
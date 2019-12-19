import React from 'react';
import { hot } from 'react-hot-loader'
import loadable from "loadable-components";
import {HashRouter as Router, Route} from 'react-router-dom';

import AppShell from './AppShell';

const Greeting = loadable(() =>
  import(/* webpackChunkName: "greeting" */ "./Greeting")
);

const Users = loadable(() =>
  import(/* webpackChunkName: "users" */ "./Users")
);

const Notification = loadable(() =>
  import(/* webpackChunkName: "notification" */ "./Notification")
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <AppShell>
          <React.Fragment>
            <Route exact path="/" component={Greeting}/>
            <Route path="/users/:id?" component={Users}/>
            <Route path="/notification" component={Notification}/>
          </React.Fragment>
        </AppShell>
      </Router>
    );
  }
}

export default hot(module)(App);

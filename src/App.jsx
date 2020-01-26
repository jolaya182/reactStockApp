/**
 * title: App.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles
 */
import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Home, CusipCardComp } from './pages';

// eslint-disable-next-line no-unused-vars
import pages from './index.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/:id" component={CusipCardComp} />
      </Switch>
    </Router>
  );
}

export default App;

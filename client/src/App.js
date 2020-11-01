import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './components/Landing';
import Studio from './components/Studio';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Studio />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

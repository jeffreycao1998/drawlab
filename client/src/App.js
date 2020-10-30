import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './components/Landing';
import WhiteBoard from './components/WhiteBoard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <WhiteBoard />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

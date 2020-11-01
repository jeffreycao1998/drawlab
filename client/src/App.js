import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './components/Landing';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Canvas />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

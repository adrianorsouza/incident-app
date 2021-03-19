import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Incident from './app/Incident';
import IncidentEdit from './app/IncidentEdit';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Incident />
          </Route>
          <Route path="/edit/:id">
            <IncidentEdit />
          </Route>
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

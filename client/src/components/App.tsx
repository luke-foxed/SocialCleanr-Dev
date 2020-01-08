import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import Login from './Auth/Login';
import Dashboard from './views/Dashboard/Dashboard';
import { Fragment } from 'react';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path='/' component={Landing} />
      <div className='container'>
        <Switch>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/dashboard' component={Dashboard}></Route>
        </Switch>
      </div>
    </Fragment>
  </Router>
);

export default App;

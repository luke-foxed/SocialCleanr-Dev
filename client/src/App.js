import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Alerter from './components/Layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment className='App'>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alerter />
          <Switch>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerter from './components/layout/Alert';
import Auth from './components/auth/Auth';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Fragment className='App'>
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alerter />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/auth' component={Auth} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;

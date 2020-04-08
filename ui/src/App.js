import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Auth from './components/auth/Auth';
import DashboardDesktop from './components/dashboard/DashboardDesktop';
import DashboardMobile from './components/dashboard/DashboardMobile';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerter from './components/layout/Alert';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './helpers/tokenHelper';
import { loadUser } from './actions/auth';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const ResponsiveDashboard = () => {
    if (isMobile) {
      return <DashboardMobile />;
    } else {
      return <DashboardDesktop />;
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Fragment className='App'>
          <Route exact path='/' component={Landing} />
          <section className='app'>
            <Alerter />
            <Switch>
              <Route exact path='/auth' component={Auth} />
              <PrivateRoute
                exact
                path='/dashboard'
                component={ResponsiveDashboard}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

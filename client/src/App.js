import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Register from './components/auth/register';
import RegisterFacebook from './components/auth/registerFacebook';

const App = () => (
  <Router>
    <Fragment className='App'>
      <Route exact path='/' />
      <div className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/register-facebook' component={RegisterFacebook} />
        </Switch>
      </div>
    </Fragment>
  </Router>
);

export default App;

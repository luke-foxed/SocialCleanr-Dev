import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './components/auth/Login';
import RegisterFacebook from './components/auth/registerFacebook';
import Landing from './components/layout/Landing';

const App = () => (
  <Router>
    <Fragment className='App'>
      <Route exact path='/' component={Landing} />
      <Container className='container'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register-facebook' component={RegisterFacebook} />
        </Switch>
      </Container>
    </Fragment>
  </Router>
);

export default App;

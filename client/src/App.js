import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoginModal from './components/auth/LoginModal';
import Landing from './components/layout/Landing';

const App = () => (
  <Router>
    <Fragment className='App'>
      <Route exact path='/' component={Landing} />
      <Container className='container'>
        <Switch>
          <Route exact path='/login' component={LoginModal} />
        </Switch>
      </Container>
    </Fragment>
  </Router>
);

export default App;

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Landing from './views/Landing';
import Login from './components/Auth/Login';
import Dashboard from './views/Dashboard/Dashboard';
import Home from './views/SidebarPages/Home';
=======
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
>>>>>>> 34bebe36b0a261940ce2eb897d61819483be19c9

const App = () => (
  <Router>
    <Fragment className='App'>
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

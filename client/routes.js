import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Users from './components/Users';

const Routes = ()=>(
  <Switch> //Switch componenet iteraters over the routes
    <Route path ='/users' render={()=> <Users/>} />
    <Route exact path ='/' component={App} />
    <Route exact path ='/one' component={App} />
  </Switch>
);

export default Routes;

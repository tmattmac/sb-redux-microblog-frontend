import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddPostForm from './AddPostForm';
import Post from './Post';
import Home from './Home';

const Routes = () => {
  return ( 
    <Switch>
      <Route exact path="/new">
        <AddPostForm />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:id">
        <Post />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
   );
}
 
export default Routes;
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "../screens/Home";

export default function routeur() {
  return (
    <Switch>
    <Route exact path="/" component={Home}/>
  </Switch>
  );
}

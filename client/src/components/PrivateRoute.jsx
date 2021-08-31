import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth] = useState(localStorage.getItem('skill_grade_token') ? true : false);
  return <Route {...rest} render={props => (auth ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default PrivateRoute;

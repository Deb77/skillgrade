import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
  return <Route {...rest} render={props => (auth ? <Component {...props} /> : <Redirect to="/admin" />)} />;
};

const mapStateToProps = state => {
  return {
    auth: state.adminAuth.auth
  };
};

export default connect(mapStateToProps)(AdminPrivateRoute);

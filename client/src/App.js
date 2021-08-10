import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute';
import store from './store';
import { Provider } from 'react-redux';
const Landing = lazy(() => import('./pages/landing'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Admin = lazy(() => import('./pages/admin'));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;

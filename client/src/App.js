import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminPrivateRoute from './components/Common/AdminPrivateRoute';
import store from './store';
import { Provider } from 'react-redux';
const Landing = lazy(() => import('./pages/landing'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Admin = lazy(() => import('./pages/admin/Home'));
const Examine = lazy(() => import('./pages/admin/Examine'));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin" component={AdminLogin} />
            <AdminPrivateRoute exact path="/admin/home" component={Admin} />
            <AdminPrivateRoute exact path="/admin/examine" component={Examine} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;

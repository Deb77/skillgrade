import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminPrivateRoute from './components/Common/AdminPrivateRoute';
import store from './store';
import { Provider } from 'react-redux';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Admin from './pages/admin/Home';
import Examine from './pages/admin/Examine';
import Tasklist from './pages/tasklist';
import TaskPage from './pages/taskpage';
import Leaderboard from './pages/leaderboard';
import About from './pages/About';
import Help from './pages/Help';

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
            <PrivateRoute exact path="/tasklist/:id" component={Tasklist} />
            <PrivateRoute exact path="/taskpage/:course/:id" component={TaskPage} />
            <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/help" component={Help} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;

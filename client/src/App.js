import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import store from './store';
import { Provider } from 'react-redux';

const Landing = lazy(() => import('./pages/landing'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Tasklist = lazy(() => import('./pages/tasklist'));
const TaskPage = lazy(() => import('./pages/taskpage'));
const Leaderboard = lazy(() => import('./pages/leaderboard'));
const About = lazy(() => import('./pages/About'));
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/tasklist/:id" component={Tasklist} />
            <PrivateRoute exact path="/taskpage/:course/:id" component={TaskPage} />
            <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
            <PrivateRoute exact path="/about" component={About} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;

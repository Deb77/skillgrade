import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute';

const Landing = lazy(() => import('./pages/landing'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/test" component={Landing} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Landing = lazy(() => import('./pages/landing'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

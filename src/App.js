import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Evaluation from './pages/evaluation/Evaluation';
import { HOME_ROUTE, EVAL_ROUTE } from './const/routes';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={HOME_ROUTE}>
            <Home />
          </Route>
          <Route path={EVAL_ROUTE}>
            <Evaluation />
          </Route>
          <Route path='*'>
            <h1>Página no encontrada</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

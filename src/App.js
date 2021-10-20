import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import Evaluation from './pages/evaluation/Evaluation';
import { HOME_ROUTE, EVAL_ROUTE } from './const/routes';
import { TotalProvider } from './context/context';

function App() {
  return (
    <div className='App'>
      <TotalProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Redirect to={HOME_ROUTE} />
            </Route>
            <Route path={HOME_ROUTE}>
              <Home />
            </Route>
            <Route path={EVAL_ROUTE}>
              <Evaluation />
            </Route>
            <Route path='*'>
              <h1 className='main-title'>Página no encontrada</h1>
            </Route>
          </Switch>
        </Router>
      </TotalProvider>
    </div>
  );
}

export default App;

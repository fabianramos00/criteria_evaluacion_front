import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import Evaluation from './pages/evaluation/Evaluation';
import { HOME_ROUTE, EVAL_ROUTE, summaryRoute, summaryPrintRoute } from './const/routes';
import { TotalProvider } from './context/context';
import Summary from './pages/summary/Summary';
import PDFEvaluation from './components/summary/PDFEvaluation/PDFEvaluation';

function App() {
  return (
    <div className='App' id='app'>
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
            <Route exact path={summaryRoute()}>
              <Summary />
            </Route>
            <Route exact path={summaryPrintRoute()}>
              <PDFEvaluation />
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

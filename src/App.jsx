import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Evaluation from './pages/evaluation/Evaluation';
import { HOME_ROUTE } from './const/routes';
import { TotalProvider } from './context/context';

function App() {
  return (
    <div className='App' id='app'>
      <TotalProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path='/' element={<Navigate to={HOME_ROUTE} replace />} />
            <Route path={`${HOME_ROUTE}/*`} element={<Home />} />
            <Route path='/eval/:token/*' element={<Evaluation />} />
            <Route path='*' element={<h1 className='main-title'>Página no encontrada</h1>} />
          </Routes>
        </Router>
      </TotalProvider>
    </div>
  );
}

export default App;

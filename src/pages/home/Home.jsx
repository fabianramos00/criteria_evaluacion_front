import { Routes, Route } from 'react-router-dom';
import { HOME_ROUTE } from '../../const/routes';
import Form from '../../components/home/form/Form';
import Menu from '../../components/general/menu/Menu';
import EvaluationList from '../../components/home/evaluationList/EvaluationList';
import './Home.scss';

function Home() {
  const items = [
    {
      path: HOME_ROUTE,
      icon: 'library_add',
      text: 'Comenzar evaluación',
    },
    {
      path: `${HOME_ROUTE}/list`,
      icon: 'inventory',
      text: 'Historial',
    },
  ];

  return (
    <section className='home'>
      <Menu title='Evaluación de repositorios' items={items} />
      <article className='content'>
        <Routes>
          <Route
            index
            element={
              <div className='form-view'>
                <div className='header-group'>
                  <h1 className='main-title'>Evaluar repositorio</h1>
                  <p className='main-subtitle'>
                    Complete los campos obligatorios para iniciar el análisis automático de calidad y
                    cumplimiento de estándares para repositorios institucionales y académicos.
                  </p>
                </div>
                <Form />
              </div>
            }
          />
          <Route path='list' element={<EvaluationList />} />
        </Routes>
      </article>
    </section>
  );
}

export default Home;

import { useRouteMatch, Route } from 'react-router-dom';
import { homeList } from '../../const/routes';
import Form from '../../components/home/form/Form';
import Menu from '../../components/general/menu/Menu';
import './Home.scss';

function Home() {
  const { path, url } = useRouteMatch();

  const items = [
    {
      path: url,
      icon: 'library_add',
      text: 'Comenzar evaluación',
    },
    {
      path: homeList(url),
      icon: 'inventory',
      text: 'Evaluaciones existentes',
    },
  ];

  return (
    <section className='home'>
      <Menu title='Evaluación de repositorios' items={items} />
      <article className='content'>
        <Route exact path={path}>
          <h2 className='main-title'>Evaluar repositorio</h2>
          <Form />
        </Route>
        <Route exact path={`${path}/list`}>
          <h2 className='main-title'>Repositorios evaluados</h2>
        </Route>
      </article>
    </section>
  );
}

export default Home;

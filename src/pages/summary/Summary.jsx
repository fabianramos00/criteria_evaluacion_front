import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { summary } from '../../services/evaluation.services';
import { HOME_ROUTE, summaryRoute, visibilityRoute } from '../../const/routes';
import { Tooltip } from 'react-tooltip';
import './Summary.scss';
import { HashLoader } from 'react-spinners';

const Summary = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState('');

  const { token } = useParams();

  useEffect(() => {
    setLoading(true);
    summary(token).then(data => {
      const { is_completed, repository_names, rating, summary, repository_url } = data;
      setComplete(is_completed);
      setRepositoryNames(repository_names);
      setScore(rating);
      setItems(summary);
      setUrl(repository_url);
    }).catch(() => {
    }).finally(() => setLoading(false));
  }, [token]);

  return (
    <>
      {loading && (
        <div className='blocking-loading visible'>
          <HashLoader color='var(--assessment-400)' loading={loading} size={150} />
          <h1>Cargando</h1>
        </div>
      )}
      <section className='summary'>
        <h1 className='main-title'>{repositoryNames[0]}</h1>
        <header>
          <div className='names'>
            <b>Nombres registrados</b>
            <ul>
              {repositoryNames.map((name, index) => (
                <li key={`repository-name-${index}`}>{name}</li>
              ))}
            </ul>
            <b>Enlace: </b>
            <a href={url} className='link'>
              {url}
            </a>
            <br />
            <br />
            <b className='state'>
              Estado:{' '}
              <span className={complete ? 'complete' : 'progress'}>
                {complete ? 'Completo' : 'En proceso'}
              </span>
            </b>
          </div>
        </header>
        <div className='options'>
          <a href={visibilityRoute(token)} data-tooltip-id='action-tooltip' data-tooltip-content='Ver evaluación'>
            <span className='material-icons-outlined'>format_list_bulleted</span>
          </a>
          <a href={HOME_ROUTE} data-tooltip-id='action-tooltip' data-tooltip-content='Inicio'>
            <span className='material-icons-outlined'>home</span>
          </a>
          <a href={summaryRoute(token)} data-tooltip-id='action-tooltip' data-tooltip-content='Imprimir evaluación'>
            <span className='material-icons-outlined'>print</span>
          </a>
        </div>
        <Tooltip id='action-tooltip' />
        <div className='content'>
          {items.map(({ item, total }, index) => (
            <article key={`item-${index}`} className='item-card'>
              <p>{item}</p>
              <p className='total'>{total}</p>
            </article>
          ))}
          <article className='score'>
            <p>Puntaje total</p>
            <p>{score}</p>
          </article>
        </div>
      </section>
    </>
  );
};

export default Summary;

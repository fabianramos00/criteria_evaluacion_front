import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { summary } from '../../services/evaluation.services';
import { HOME_ROUTE, summaryRoute, visibilityRoute } from '../../const/routes';
import ReactTooltip from 'react-tooltip';
import './Summary.scss';

const Summary = () => {
  const [complete, setComplete] = useState(false);
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState('');

  const { token } = useParams();

  useEffect(() => {
    summary(token).then(data => {
      const { is_completed, repository_names, rating, summary, repository_url } = data;
      setComplete(is_completed);
      setRepositoryNames(repository_names);
      setScore(rating);
      setItems(summary);
      setUrl(repository_url);
    });
  }, [token]);

  return (
    <>
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
          <a href={visibilityRoute(token)} data-tip='Ver evaluación'>
            <span className='material-icons-outlined'>format_list_bulleted</span>
          </a>
          <a href={HOME_ROUTE} data-tip='Inicio'>
            <span className='material-icons-outlined'>home</span>
          </a>
          <a href={summaryRoute(token)} data-tip='Imprimir evaluación'>
            <span className='material-icons-outlined'>print</span>
          </a>
        </div>
        <ReactTooltip backgroundColor='#636161' textColor='#fff' />
        <div className='content'>
          {items.map(({ item_name, total }, index) => (
            <article key={`item-${index}`} className='item-card'>
              <p>{item_name}</p>
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

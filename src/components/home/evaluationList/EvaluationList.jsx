import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listEvaluations } from '../../../services/home.services';
import { formatDate } from '../../../utils/common';
import { servicesRoute, visibilityRoute } from '../../../const/routes';
import './EvaluationList.scss';

const EvaluationList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    listEvaluations()
      .then(data => setList(data?.items || []))
      .finally(() => setLoading(false));
  }, []);

  const handleContinueClick = (item = '', token = '') => {
    if (item.toLowerCase() === 'visibility' || item.toLowerCase() === 'started') {
      history.push(visibilityRoute(token));
    } else {
      history.push(`${visibilityRoute(token)}/${item}`);
    }
  };

  const handleEvaluationClick = (token = '') => history.push(servicesRoute(token));

  return (
    <div className='evaluation-list'>
      <h2 className='main-title'>Repositorios evaluados</h2>
      {loading && (
        <>
          <br />
          <br />
          <h1 className='main-title'>Cargando. . . </h1>
        </>
      )}
      <div className='two-col-content'>
        {list.map((item, index) => (
          <div key={`eval-${index}`} className='evaluation-card'>
            <div className={`score ${item.is_completed ? 'complete' : ''}`}>{item.rating}</div>
            <div className='content'>
              {Array.isArray(item.repository_names) &&
                item.repository_names.map((name, j) => (
                  <li key={`rapo-name-${index}-${j}`} className='name'>
                    {name}
                  </li>
                ))}
              <div className='date'>
                <a href={item.repository_url} className='link' target='_blank' rel='noreferrer'>
                  {item.repository_url}
                </a>
                <p>Creación: {formatDate(item.created_on)}</p>
                <p>Última Actualización: {formatDate(item.last_updated)}</p>
              </div>
              <div className='status'>
                <div className={`state ${item.is_completed ? 'complete' : ''}`}>
                  {item.is_completed ? 'Completo' : 'En progreso'}
                </div>
                {item.is_completed ? (
                  <button className='cta' onClick={() => handleEvaluationClick(item.token)}>
                    Ver evaluación
                  </button>
                ) : (
                  <button
                    className='cta'
                    onClick={() => handleContinueClick(item.last_item_evaluated, item.token)}
                  >
                    Continuar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationList;

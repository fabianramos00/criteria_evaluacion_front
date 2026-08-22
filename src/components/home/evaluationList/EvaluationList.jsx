import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listEvaluations } from '../../../services/home.services';
import { formatDate } from '../../../utils/common';
import { visibilityRoute, HOME_ROUTE, getRouteBySection, summaryRoute } from '../../../const/routes';
import './EvaluationList.scss';
import Loading from '../../general/loading/Loading';

const ITEMS_PER_PAGE = 8;

const EvaluationList = () => {
  const [data, setData] = useState({ items: [], total_records: 0, pages: 0, has_prev: false, has_next: false, prev_num: null, next_num: null });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    listEvaluations(page, ITEMS_PER_PAGE, search)
      .then(res => setData({
        items: res?.items || [],
        total_records: res?.total_records || 0,
        pages: res?.pages || 0,
        has_prev: res?.has_prev || false,
        has_next: res?.has_next || false,
        prev_num: res?.prev_num || null,
        next_num: res?.next_num || null,
      }))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleContinueClick = (item = '', token = '') => {
    let item_lower = item.toLowerCase();
    if (item_lower === 'started') {
      navigate(visibilityRoute(token));
    } else {
      navigate(getRouteBySection[item_lower](token));
    }
  };

  const handleEvaluationClick = (token = '') => navigate(summaryRoute(token));
  const handleNewEvaluation = () => navigate(HOME_ROUTE);

  // Ventana de páginas: primera, actual ±1 y última, con puntos suspensivos en los huecos
  const renderPages = () => {
    const pages = [...new Set([1, page - 1, page, page + 1, data.pages])]
      .filter(p => p >= 1 && p <= data.pages)
      .sort((a, b) => a - b);

    const items = [];
    let prev = 0;
    pages.forEach(p => {
      if (p - prev > 1) items.push('...');
      items.push(p);
      prev = p;
    });
    return items;
  };

  return (
    <div className='evaluation-list'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='list-title'>Repositorios evaluados</h2>
          <p className='list-subtitle'>Historial de evaluaciones realizadas a repositorios institucionales</p>
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='search-wrapper'>
            <span className='material-icons search-icon'>search</span>
            <input
              type='text'
              className='search-input'
              placeholder='Buscar repositorios...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className='search-clear' onClick={() => setSearch('')} aria-label='Limpiar búsqueda'>
                <span className='material-icons'>close</span>
              </button>
            )}
          </div>
          <button className='btn-new' onClick={handleNewEvaluation}>
            <span className='material-icons text-xl'>add_circle</span>
            Nueva Evaluación
          </button>
        </div>
      </div>

      {loading ? (
        <Loading loading={loading} overlay={false} />
      ) : (
        <>
          {data.items.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
              <div className='relative w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center mb-8'>
                <img src='/storage.png' alt='Sin repositorios' className='w-16 h-16 object-contain' />
              </div>

              <h3 className='text-2xl font-bold mb-3' style={{ color: 'var(--ink-900)', fontFamily: 'var(--font-display)' }}>
                No hay repositorios institucionales disponibles para esta búsqueda
              </h3>
              <p className='text-sm max-w-sm mb-8 leading-relaxed' style={{ color: 'var(--ink-500)' }}>
                Intenta con otros términos o elimina algunos filtros para ampliar los resultados
              </p>

              <button
                className='btn-new flex items-center gap-2 px-8 py-3 text-base rounded-xl mb-6'
                onClick={handleNewEvaluation}
              >
                <span className='material-icons text-xl'>add_circle</span>
                Nueva Evaluación
                <span className='material-icons text-xl'>arrow_forward</span>
              </button>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                {data.items.map((item, index) => (
                  <div key={`eval-${index}`} className='eval-card'>
                    <div className={`score-badge ${item.is_completed ? 'complete' : ''}`}>
                      <span className='score-label'>PUNTAJE</span>
                      <span className='score-value'>{item.rating ?? '—'}</span>
                    </div>

                    <div className='mt-auto card-body'>
                      <div className='card-top'>
                        <div className='name-group'>
                          {Array.isArray(item.repository_names) &&
                            item.repository_names.map((name, j) => (
                              <h3 key={j} className='repo-name'>
                                {name}
                              </h3>
                            ))}
                        </div>
                        <div className={`status-badge ${item.is_completed ? 'complete' : 'in-progress'}`}>
                          <span className='material-icons status-icon'>
                            {item.is_completed ? 'check_circle' : 'pending'}
                          </span>
                          {item.is_completed ? 'COMPLETO' : 'EN PROCESO'}
                        </div>
                      </div>

                      <a
                        href={item.repository_url}
                        className='repo-link'
                        target='_blank'
                        rel='noreferrer'
                      >
                        {item.repository_url}
                        <span className='material-icons link-icon'>open_in_new</span>
                      </a>

                      <div className='card-bottom'>
                        <div className='card-dates'>
                          <div className='date-item'>
                            <span className='date-label'>FECHA DE CREACIÓN</span>
                            <div className='date-value'>
                              <span className='material-icons date-icon'>calendar_today</span>
                              {formatDate(item.created_at)}
                            </div>
                          </div>
                          <div className='date-item'>
                            <span className='date-label'>ÚLTIMA ACTUALIZACIÓN</span>
                            <div className='date-value'>
                              <span className='material-icons date-icon'>schedule</span>
                              {formatDate(item.updated_at)}
                            </div>
                          </div>
                        </div>

                        {item.is_completed ? (
                          <button
                            className='btn-action primary'
                            onClick={() => handleEvaluationClick(item.id)}
                          >
                            <span className='material-icons'>visibility</span>
                            Ver evaluación
                          </button>
                        ) : (
                          <button
                            className='btn-action outline'
                            onClick={() => handleContinueClick(item.last_item_evaluated, item.id)}
                          >
                            Continuar evaluación
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
                )}
              </div>

              {data.total_records > 0 && (
                <div className='pagination'>
                  <span className='pagination-info'>
                    Mostrando {data.items.length} de {data.total_records} repositorios
                  </span>
                  <div className='pagination-controls'>
                    <button
                      className='page-btn nav'
                      onClick={() => data.prev_num && setPage(data.prev_num)}
                      disabled={!data.has_prev}
                    >
                      <span className='material-icons'>chevron_left</span>
                    </button>
                    {renderPages().map((p, index) =>
                      p === '...' ? (
                        <span key={`ellipsis-${index}`} className='page-ellipsis'>
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          className={`page-btn ${page === p ? 'active' : ''}`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      className='page-btn nav'
                      onClick={() => data.next_num && setPage(data.next_num)}
                      disabled={!data.has_next}
                    >
                      <span className='material-icons'>chevron_right</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EvaluationList;

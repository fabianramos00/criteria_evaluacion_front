import { useState, useMemo } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './Steps.scss';

function Steps({ items = [] }) {
  const [headerPage, setHeaderPage] = useState(0);
  const { token } = useParams();

  const headerSteps = useMemo(() => items.slice(headerPage, headerPage + 3), [headerPage, items]);
  const hasNext = useMemo(() => headerPage + 4 < items.length, [headerPage, items]);
  const hasPrev = headerPage > 0;

  const getPath = (stepPath, token) => {
    return typeof stepPath === 'function' ? stepPath(token) : stepPath;
  };

  const next = () => {
    if (hasNext) setHeaderPage(headerPage + 1);
  };

  const prev = () => {
    if (hasPrev) setHeaderPage(headerPage - 1);
  };

  return (
    <div className='steps'>
      <div className='header'>
        <i
          className={`fas fa-chevron-circle-left pagination-btn ${!hasPrev && 'hide'}`}
          onClick={prev}
        />
        {headerSteps.map((step, i) => (
          <div key={`step-${step.id}`} className='item'>
            <div className='steps__header'>
              <NavLink
                to={getPath(step.path, token)}
                className={({ isActive }) =>
                  `steps__badge ${isActive ? 'steps__badge--complete' : ''}`
                }
                end
              >
                <div>{headerPage + i + 1}</div>
              </NavLink>
              <div className='label'>{step.label}</div>
            </div>
          </div>
        ))}
        <i
          className={`fas fa-chevron-circle-right pagination-btn ${!hasNext && 'hide'}`}
          onClick={next}
        />
      </div>
    </div>
  );
}

export const StepControls = ({
  showBack = true,
  nextRoute = '',
  backRoute = '',
  nextText = false,
  loading = false,
  total,
}) => {
  const navigate = useNavigate();

  const goNext = () => nextRoute && navigate(nextRoute);

  const goBack = () => backRoute && navigate(backRoute);

  const handleClick = () => {
    if (nextText) {
      goNext();
    }
  };

  return (
    <div className='step-controls'>
      <div>
        {showBack && (
          <button className='step-controls__btn' onClick={goBack}>
            volver
          </button>
        )}
        <button
          type='submit'
          onClick={handleClick}
          className='step-controls__btn step-controls__btn--next'
          disabled={loading}
        >
          {nextText ? 'Siguiente' : loading ? 'Cargando...' : 'Guardar'}
        </button>
      </div>
      {total && <h3>Total {total}</h3>}
    </div>
  );
};

export default Steps;

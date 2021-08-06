import './Steps.scss';
import { useState, useMemo } from 'react';
import { Switch, Route, useRouteMatch, NavLink, useParams, useHistory } from 'react-router-dom';

function Steps({ items = [] }) {
  const [headerPage, setHeaderPage] = useState(0);
  const { path } = useRouteMatch();
  const { token } = useParams();

  const headerSteps = useMemo(() => items.slice(headerPage, headerPage + 3), [headerPage, items]);
  const hasNext = useMemo(() => headerPage + 4 < items.length, [headerPage, items]);
  const hasPrev = headerPage > 0;

  const getPath = (stepPath, token) => {
    return typeof stepPath === 'function' ? stepPath(token) : `${path}${stepPath}`;
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
                activeClassName='steps__badge steps__badge--complete'
                className='steps__badge'
                exact
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
      <div className='content'>
        {items.map(step => (
          <Switch key={`content-${step.id}`}>
            <Route exact path={getPath(step.path)}>
              <Step step={step} />
            </Route>
          </Switch>
        ))}
      </div>
    </div>
  );
}

const Step = ({ step }) => {
  return <div className='steps__content'>{step.component}</div>;
};

export const StepControls = ({
  showBack = true,
  nextRoute = '',
  backRoute = '',
  nextText = false,
}) => {
  const history = useHistory();

  const goNext = () => nextRoute && history.push(nextRoute);

  const goBack = () => backRoute && history.push(backRoute);

  return (
    <div className='step-controls'>
      {showBack && (
        <button type='submit' className='step-controls__btn' onClick={goBack}>
          volver
        </button>
      )}
      <button
        type='submit'
        onClick={nextText && goNext}
        className='step-controls__btn step-controls__btn--next'
      >
        {nextText ? 'Siguiente' : 'Guardar'}
      </button>
    </div>
  );
};

export default Steps;

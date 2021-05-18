import './Steps.scss';
import { Switch, Route, useRouteMatch, NavLink, useParams, useHistory } from 'react-router-dom';

function Steps({ items = [] }) {
  const { path } = useRouteMatch();
  const { token } = useParams();

  const getPath = (stepPath, token) => {
    return typeof stepPath === 'function' ? stepPath(token) : `${path}${stepPath}`;
  };

  return (
    <div className='steps'>
      {items.map((step, i) => (
        <div key={`step-${step.id}`} className='steps__item'>
          <div className='steps__header'>
            <NavLink
              to={getPath(step.path, token)}
              activeClassName='steps__badge steps__badge--complete'
              className='steps__badge'
              exact
            >
              <div>{i + 1}</div>
            </NavLink>
            <div className='steps__label'>{step.label}</div>
          </div>
          <Switch>
            <Route exact path={getPath(step.path)}>
              <Step step={step} />
            </Route>
          </Switch>
        </div>
      ))}
    </div>
  );
}

const Step = ({ step }) => {
  return <div className='steps__content'>{step.component}</div>;
};

export const StepControls = ({ showBack = true, nextRoute = '', backRoute = '' }) => {
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
        onClick={goNext}
        className='step-controls__btn step-controls__btn--next'
      >
        Siguiente
      </button>
    </div>
  );
};

export default Steps;

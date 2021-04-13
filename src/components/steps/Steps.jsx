import './Steps.scss';
import { useState } from 'react';

function Steps({ items = [] }) {
  const [active, setActive] = useState(0);

  const next = () => setActive(prev => prev + 1);

  const back = () => setActive(prev => prev - 1);

  const finish = () => {
    next();
    console.log('Terminar');
  };

  return (
    <div className='steps'>
      {items.map((step, i) => (
        <div key={`step-${step.id}`} className='steps__item'>
          <div className='steps__header'>
            <div className={i < active ? ' steps__badge steps__badge--complete' : 'steps__badge'}>
              {i + 1}
            </div>
            <div className='steps__label'>{step.label}</div>
          </div>
          {i === active && (
            <div className='steps__content'>
              {step.component}
              <div className='steps__controls'>
                {active > 0 && <button onClick={back}>Anterior</button>}
                {active < items.length - 1 && <button onClick={next}>Siguiente</button>}
                {active === items.length - 1 && <button onClick={finish}>Finalizar</button>}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Steps;

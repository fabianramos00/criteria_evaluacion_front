import { Tooltip } from 'react-tooltip';
import './Option.scss';
import DetailsModal from '../detailsModal/DetailsModal';
import { useState } from 'react';

const Option = ({ step = 1, label = '', text = '', automatic = false, value, children }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const handleDetails = () => setOpenDetails(!openDetails);
  const score = typeof value === 'object' ? value.value : value;
  const scoreText =
    typeof value === 'object' && value.text ? value.text : score === 0 ? 'No aplica' : 'Aplica';
  return (
    <div className='option'>
      <div className='header'>
        <p className='title'>
          <b>{step}. {label}</b>
          {text && <span className='subtitle'>: {text}</span>}
        </p>
        {automatic && (
          <>
            <div
              className='tag'
              data-tooltip-id={`tooltip-${step}`}
              data-tooltip-content='La calificación de este criterio se obtendrá de manera automática'
            >
              AUTOMÁTICO
            </div>
            <Tooltip id={`tooltip-${step}`} style={{ backgroundColor: '#636161', color: '#e3e3e3' }} />
          </>
        )}
      </div>

      <div className='content'>
        {children}
      </div>

      {typeof value !== 'undefined' && String(value) !== '' && (
        <div className='footer'>
          <div className='status'>
            {typeof value === 'object' && typeof value.details !== 'undefined' && (Array.isArray(value.details) && value.details.length !== 0) ? (
              <div className='details-trigger'>
                <span>{scoreText}</span>
                <span
                  onClick={handleDetails}
                  className='material-icons-outlined'
                >
                  info
                </span>
                <DetailsModal 
                  open={openDetails} 
                  onClose={handleDetails}
                  text={label !== '' ? label : text}
                  links={value.details} 
                />
              </div>
            ) : (
              <span>{scoreText}</span>
            )}
          </div>
          <div className='score-box'>{score}</div>
        </div>
      )}
    </div>

  );
};

export default Option;

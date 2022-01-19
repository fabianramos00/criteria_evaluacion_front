import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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
      <div className='wrapper'>
        <div className='header'>
          <p>
            <b>
              {step}. {label}
              {text && ':'}
            </b>{' '}
            {text}
          </p>
          {automatic && (
            <div
              className='tag'
              data-tip='La calificación de este criterio se obtendrá de manera automática'
            >
              Automático
            </div>
          )}
          <ReactTooltip backgroundColor='#636161' textColor='#e3e3e3' />
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
      {typeof value !== 'undefined' && String(value) && (
        <div className='score-tag'>
          {typeof value === 'object' && typeof value.details !== 'undefined' ? (
            <div>
              <p>{scoreText}</p>
              <span
                onClick={handleDetails}
                className='material-icons-outlined'
              >
                  info
                </span>
              <DetailsModal open={openDetails} onClose={handleDetails}
                            text={label !== '' ? label : text}
                            links={value.details} />
            </div>
          ) : (
            <p>{scoreText}</p>
          )}
          <p>{score}</p>
        </div>
      )}
    </div>
  );
};

Option.propTypes = {
  step: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  automatic: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default Option;

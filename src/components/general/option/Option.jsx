import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Option.scss';

const Option = ({ step = 1, label = '', text = '', automatic = false, value, children }) => {
  const score = typeof value === 'object' ? value.value : value;
  const scoreText = typeof value === 'object' ? value.text : '---';

  return (
    <div className='option'>
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
      {children}
      {value && (
        <div className='score-tag'>
          <p>{scoreText}</p>
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

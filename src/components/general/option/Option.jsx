import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Option.scss';

const Option = ({ step = 1, label = '', text = '', automatic = false, evaluated = false, value, children }) => {
  const valueType = typeof value === 'object';
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
        {value && (
          <h4>{valueType ? value.value : value}</h4>
        )}
        <ReactTooltip backgroundColor='#636161' textColor='#e3e3e3' />
      </div>
      {children}
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

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Option.scss';

const Option = ({ step = 1, label = '', text = '', automatic = false, children }) => {
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
            data-tip='La recolección de este criterio se realizará de manera automática'
          >
            Automático
          </div>
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

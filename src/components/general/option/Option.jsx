import React from 'react';
import PropTypes from 'prop-types';
import './Option.scss';

const Option = ({ step = 1, label = '', text = '', children }) => {
  return (
    <div className='option'>
      <p>
        <b>
          {step}. {label}
          {text && ':'}
        </b>{' '}
        {text}
      </p>
      {children}
    </div>
  );
};

Option.propTypes = {
  step: PropTypes.number,
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default Option;

import './Input.scss';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Input = forwardRef(({ label = '', error = '', required, ...props }, ref) => {
  return (
    <div className='input-wrapper'>
      <p className='label'>
        {label}
        {required && '*'}
      </p>
      <input className='input' {...props} />
      <ErrorMessage message={error} className='error' />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;

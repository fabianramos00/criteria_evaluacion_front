import './Input.scss';
import React, { forwardRef } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Input = forwardRef(({ label = '', error = '', icon = '', required, className, ...props }, ref) => {
  return (
    <div className={`input-wrapper ${className} ${icon ? 'has-icon' : ''}`}>
      {label && (
        <p className='label'>
          {label}
          {required && '*'}
        </p>
      )}
      <div className='field-container'>
        {icon && <span className='material-icons-outlined input-icon'>{icon}</span>}
        <input className='input' {...props} ref={ref} />
      </div>
      <ErrorMessage message={error} className='error' />
    </div>
  );
});


export default Input;

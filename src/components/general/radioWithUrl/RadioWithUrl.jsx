import React, { useState, forwardRef } from 'react';
import RadioGroup from '../radioGroup/RadioGroup';
import Input from '../input/Input';
import { URL_PLACEHOLDER, YES_NO_OPTIONS } from '../../../const/common';
import PropTypes from 'prop-types';
import './RadioWithUrl.scss';

const RadioWithUrl = forwardRef(
  ({ control, radioName = '', urlLabel = '', error = '', disabled = false, data, ...props }, ref) => {
    const [showUrl, setShowUrl] = useState(typeof data !== 'undefined' && typeof data === 'object' ? data.data !== 0 : false);
    return (
      <div className='radio-with-url'>
        <RadioGroup
          options={YES_NO_OPTIONS}
          onChange={setShowUrl}
          control={control}
          name={radioName}
          disabled={disabled}
        />
        <div className={`url ${showUrl ? 'open' : ''}`}>
          <Input
            ref={ref}
            {...props}
            error={error}
            label={urlLabel}
            placeholder={URL_PLACEHOLDER}
            value={typeof data !== 'undefined' && typeof data === 'object' && data.url ? data.url : undefined}
            disabled={disabled}
            required
          />
        </div>
      </div>
    );
  },
);

RadioWithUrl.propTypes = {
  radioName: PropTypes.string,
  urlLabel: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default RadioWithUrl;

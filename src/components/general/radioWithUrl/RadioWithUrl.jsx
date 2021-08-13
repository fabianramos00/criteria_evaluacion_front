import React, { useState, forwardRef } from 'react';
import RadioGroup from '../radioGroup/RadioGroup';
import Input from '../input/Input';
import { URL_PLACEHOLDER, YES_NO_OPTIONS } from '../../../const/common';
import PropTypes from 'prop-types';

const RadioWithUrl = forwardRef(
  ({ control, radioName = '', urlLabel = '', error = '', ...props }, ref) => {
    const [showUrl, setShowUrl] = useState(false);

    return (
      <>
        <RadioGroup
          options={YES_NO_OPTIONS}
          onChange={setShowUrl}
          control={control}
          name={radioName}
        />
        {showUrl && (
          <div className='vertical-padding horizontal-padding'>
            <Input
              ref={ref}
              {...props}
              error={error}
              label={urlLabel}
              placeholder={URL_PLACEHOLDER}
              required
            />
          </div>
        )}
      </>
    );
  },
);

RadioWithUrl.propTypes = {
  radioName: PropTypes.string,
  urlLabel: PropTypes.string,
  error: PropTypes.string,
};

export default RadioWithUrl;

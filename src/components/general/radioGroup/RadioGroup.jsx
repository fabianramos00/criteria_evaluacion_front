import './styles.scss';
import { useState } from 'react';
import RadioBtn from '../radioBtn/RadioBtn';
import { Controller } from 'react-hook-form';

const RadioGroup = ({ control, text = '', options = [], onChange = () => {}, name}) => {
  const handleChange = e => {
    const value = e.target.value;

    if (typeof value === 'boolean') {
      onChange(value);
    } else {
      onChange(value === 'true');
    }
  };
  return (
    <>
      <p>{text}</p>
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <fieldset style={{ display: 'flex' }} onChange={onChange}>
              {options.map(option => (
                <RadioBtn
                  key={`opt-${option.id}`}
                  label={option.label}
                  value={option.value}
                  onChange={e => {
                    onChange(e);
                    handleChange(e);
                  }}
                  name={name}
                  checked={String(value) === String(option.value)}
                />
              ))}
            </fieldset>
          )}
        />
      ) : (
        <fieldset style={{ display: 'flex' }} onChange={handleChange}>
          {options.map(option => (
            <RadioBtn
              key={`opt-${option.id}`}
              label={option.label}
              value={option.value}
              name={name}
            />
          ))}
        </fieldset>
      )}
    </>
  );
};

export default RadioGroup;

export const InputOption = ({ question, placeholder = '' }) => {
  const [currentOption, setCurrentOption] = useState('-1');

  return (
    <div className='input-option'>
      <RadioGroup
        key={`cat-${question.id}`}
        text={question.label}
        options={question.options}
        onChange={setCurrentOption}
      />
      {parseFloat(currentOption) === question.options[0]?.value && (
        <input placeholder={placeholder} />
      )}
    </div>
  );
};

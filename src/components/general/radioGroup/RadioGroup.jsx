import PropTypes from 'prop-types';
import RadioBtn from '../radioBtn/RadioBtn';
import { Controller } from 'react-hook-form';
import './styles.scss';

const RadioGroup = ({
  control,
  text = '',
  options = [],
  onChange = () => {},
  name,
  disabled = false,
}) => {
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
                  disabled={disabled}
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
              disabled={disabled}
            />
          ))}
        </fieldset>
      )}
    </>
  );
};

RadioGroup.propTypes = {
  text: PropTypes.string,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default RadioGroup;

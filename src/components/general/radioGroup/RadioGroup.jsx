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
          render={({ field: { onChange, value, disabled: fieldDisabled } }) => (
            <fieldset style={{ display: 'flex' }}>
              {options.map(option => (
                <RadioBtn
                  key={`opt-${option.id}`}
                  label={option.label}
                  value={option.value}
                  onChange={() => {
                    const newVal = option.value === 'true' || option.value === true;
                    onChange(newVal);
                    handleChange({ target: { value: newVal } });
                  }}
                  name={name}
                  checked={String(value) === String(option.value)}
                  disabled={disabled || fieldDisabled}
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

export default RadioGroup;

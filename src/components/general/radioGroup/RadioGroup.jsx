import './styles.scss';
import RadioBtn from '../radioBtn/RadioBtn';
import { useState } from 'react';

const RadioGroup = ({ text = '', options = [], onChange = () => {} }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <>
      <p>{text}</p>
      <form style={{ display: 'flex' }} onChange={handleChange}>
        {options.map(option => (
          <RadioBtn
            key={`opt-${option.id}`}
            label={option.label}
            value={option.value}
            name={`answer`}
          />
        ))}
      </form>
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

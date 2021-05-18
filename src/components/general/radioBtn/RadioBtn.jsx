import './RadioBtn.scss';

const RadioBtn = ({ label = '', name = '', value = '' }) => (
  <label>
    <input type='radio' name={name} value={value} />
    <span>{label}</span>
  </label>
);

export default RadioBtn;

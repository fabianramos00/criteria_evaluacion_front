import './RadioBtn.scss';
import { forwardRef } from 'react';

const RadioBtn = forwardRef(
  ({ label = '', name = '', value = '', onChange, checked = false, ...props }, ref) => (
    <label>
      <input type='radio' name={name} value={value} onChange={onChange} ref={ref} {...props} />
      <span>{label}</span>
    </label>
  ),
);

export default RadioBtn;

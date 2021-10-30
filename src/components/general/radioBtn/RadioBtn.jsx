import { forwardRef } from 'react';
import './RadioBtn.scss';

const RadioBtn = forwardRef(
  ({ label = '', name = '', value = '', onChange, checked = false, ...props }, ref) => {
    return (
      <label className={props.disabled ? 'disabled' : ''}>
        <input
          type='radio'
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          checked={checked}
          {...props}
        />
        <span>{label}</span>
      </label>
    );
  },
);

export default RadioBtn;

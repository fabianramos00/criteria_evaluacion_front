import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';

const Menu = memo(({ title, items = [], mode = 'dark' }) => {
  return (
    <nav className={`menu ${mode}`}>
      <div className='title'>{title}</div>
      <ul>
        {items.map((item, index) => (
          <MenuItem
            key={`menu-item-${index}`}
            to={item.path}
            text={item.text}
            icon={item.icon}
            mode={mode}
          />
        ))}
      </ul>
    </nav>
  );
});

Menu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      icon: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  mode: PropTypes.oneOf(['dark', 'light']),
};

function MenuItem({ to, icon, text, mode = 'dark' }) {
  const { pathname } = useLocation();

  return (
    <li className={`menu-item ${mode} ${pathname === to ? 'selected' : ''}`}>
      <Link to={to} className='link'>
        <p>{text}</p> <span className='material-icons-outlined md-48'>{icon}</span>
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['dark', 'light']),
};

export default Menu;

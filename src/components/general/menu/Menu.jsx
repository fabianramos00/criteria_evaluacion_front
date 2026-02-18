import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';

const Menu = memo(({ title, items = [], footerItems = [], mode = 'dark' }) => {
  return (
    <nav className={`menu ${mode}`}>
      <div className='brand-header'>
        <div className='logo-container'>
          <span className='material-icons-outlined'>analytics</span>
        </div>
        <div className='brand-info'>
          <h1 className='brand-title'>Evaluación de repositorios</h1>
        </div>
      </div>

      <div className='menu-content'>
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
      </div>

      {footerItems.length > 0 && (
        <div className='menu-footer'>
          <ul>
            {footerItems.map((item, index) => (
              <MenuItem
                key={`footer-item-${index}`}
                to={item.path}
                text={item.text}
                icon={item.icon}
                mode={mode}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
});


function MenuItem({ to, icon, text, mode = 'dark' }) {
  const { pathname } = useLocation();

  return (
    <li className={`menu-item ${mode} ${pathname === to ? 'selected' : ''}`}>
      <Link to={to} className='link'>
        <span className='material-icons-outlined md-48'>{icon}</span>
        <p>{text}</p>
      </Link>
    </li>
  );
}

export default Menu;

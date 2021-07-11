import React from 'react';

const NavItem = ({ text, href = '#', badge, isActive }) => {
  return (
    <li className='nav-item'>
      <a className={`nav-item-link ${isActive ? 'active' : ''}`} href={href}>
        {text}
      </a>
      {badge && <span className='nav-item-badge'>{badge}</span>}
    </li>
  );
};

export default NavItem;

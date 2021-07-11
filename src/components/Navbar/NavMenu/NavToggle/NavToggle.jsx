import React, { useContext } from 'react';
import navbarContext from '../../NavbarContext/NavbarContext';

function NavToggle() {
  const { isExpanded, toggleExpanded } = useContext(navbarContext);

  return (
    <button
      className={`nav-toggle ${isExpanded ? 'cross' : ''}`}
      onClick={toggleExpanded}
    >
      <span className='nav-toggle-bar' />
      <span className='nav-toggle-bar' />
      <span className='nav-toggle-bar' />
    </button>
  );
}

export default NavToggle;

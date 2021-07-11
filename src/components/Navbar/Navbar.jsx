import React, { useCallback, useContext, useEffect, useRef } from 'react';
import NavLogo from './NavLogo/NavLogo';
import NavMenu from './NavMenu/NavMenu';

import './Navbar.css';
import navbarContext from './NavbarContext/NavbarContext';

function Navbar() {
  const { isFixed, isExpanded, setFixed } = useContext(navbarContext);

  const headerRef = useRef(null);

  const fixHeader = useCallback(() => {
    if (headerRef && headerRef.current) {
      const navbarHeight = headerRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      setFixed(scrollPosition > navbarHeight / 2);
    }
  }, [setFixed]);

  useEffect(() => {
    fixHeader();

    document.addEventListener('scroll', fixHeader);
  }, [fixHeader]);

  return (
    <header
      className={`page-header ${isExpanded ? 'expanded' : ''} ${
        isFixed ? 'fixed' : ''
      }`}
      ref={headerRef}
    >
      <NavLogo />
      <NavMenu />
    </header>
  );
}

export default Navbar;

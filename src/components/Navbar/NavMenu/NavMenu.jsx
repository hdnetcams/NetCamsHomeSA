import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import navbarContext from '../NavbarContext/NavbarContext';
import NavItem from './NavItem/NavItem';
import NavToggle from './NavToggle/NavToggle';

const links = [
  { text: 'Home', isActive: true },
  { text: 'Featured Cams', badge: 'new' },
  { text: 'Public Cams' },
  { text: 'Shop' },
  { text: 'Articles', badge: 'new' },
  { text: 'Log in / Sign Up' },
];

function NavMenu() {
  const navMenuRef = useRef(null);

  const { isExpanded } = useContext(navbarContext);

  const [maxHeight, setMaxHeight] = useState(0);

  const setMenuHeight = useCallback(() => {
    let menuHeight = navMenuRef.current?.scrollHeight;

    if (window.innerWidth <= 1024) menuHeight = isExpanded ? menuHeight + 40 : 0;

    setMaxHeight(menuHeight);
  }, [isExpanded]);

  useEffect(() => {
    setMenuHeight();

    window.addEventListener('resize', setMenuHeight);
  }, [setMenuHeight]);

  return (
    <>
      <NavToggle />
      <nav
        className={`nav-menu ${isExpanded ? 'expanded' : ''}`}
        style={{ maxHeight }}
        ref={navMenuRef}
      >
        {links.map((link) => (
          <NavItem {...link} key={link.text} />
        ))}
      </nav>
    </>
  );
}

export default NavMenu;

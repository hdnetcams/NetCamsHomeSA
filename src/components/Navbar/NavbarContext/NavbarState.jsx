import React, { useState } from 'react';
import navbarContext from './NavbarContext';

const NavbarState = ({ children }) => {
  const [isFixed, setFixed] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!isExpanded);

  return (
    <navbarContext.Provider
      value={{ isFixed, isExpanded, setFixed, toggleExpanded }}
    >
      {children}
    </navbarContext.Provider>
  );
};

export default NavbarState;

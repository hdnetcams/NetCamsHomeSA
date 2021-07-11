import React, { useCallback, useEffect, useState } from 'react';

import logoLarge from '../../Home/assets/images/NetCamsV45.png';
import logoSmall from '../../Home/assets/images/NetCamsVert40h.png';

const NavLogo = () => {
  const [logo, setLogo] = useState(logoLarge);

  const decideLogo = useCallback(() => {
    if (window.innerWidth <= 1024) setLogo(logoSmall);
    else setLogo(logoLarge);
  }, []);

  useEffect(() => {
    decideLogo();

    window.addEventListener('resize', decideLogo);

    return () => window.removeEventListener('resize', decideLogo);
  }, [decideLogo]);

  return (
    <a href='#' className='nav-logo'>
      <img src={logo} alt='netcams logo' className='nav-logo-img' />
      <p className='nav-logo-description'>HD Snapshots and Video</p>
    </a>
  );
};

export default NavLogo;

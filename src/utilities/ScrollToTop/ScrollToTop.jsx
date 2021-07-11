import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import classes from './Misc.module.css';

function ScrollToTopButton() {
  const [isVisible, setVisible] = useState(false);

  const scrollToTopHandler = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const viewPortHeight = window.innerHeight / 1.25;
      const scrollPosition = window.scrollY;

      setVisible(scrollPosition > viewPortHeight);
    });
  }, []);

  return (
    <button
      className={`
        ${classes['scroll-top-btn']}
        ${isVisible ? classes['visible'] : ''}
      `.trim()}
      onClick={scrollToTopHandler}
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
}

export default ScrollToTopButton;

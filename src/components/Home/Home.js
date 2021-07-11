import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import Featured from './Featured';
import ScrollToTopButton from '../../utilities/ScrollToTop/ScrollToTop';
import GoogleMap from "./GoogleMap";
import Footer from "./Footer";
import Spacer from '../../utilities/Spacer/Spacer';

import './Home.css';

const HomePage = () => {
  // const [showPublic, setShowPublic] = useState(false);
  // const publicHandler = () => {
  //   setShowPublic();
  // };
  // const publicHideHandler = () => {
  //   setShowPublic(false);
  // };




  return (
    <main className='homepage'>
      <Navbar />
      <Hero />
      <Featured />
      <GoogleMap />
      <ScrollToTopButton />
      <Footer />
    </main>
  );
};

export default HomePage;

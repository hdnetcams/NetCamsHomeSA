import AwesomeSlider, {
  AwesomeSliderInfo,
  AwesomeSliderProps,
} from 'react-awesome-slider';

import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import image1 from './assets/images/INNOUTLAX2-1200x800.jpg';
import image2 from './assets/images/waikikibeach.jpg';
import image3 from './assets/images/lotcam7.jpg';
import image4 from './assets/images/GGFog.jpg';
import image5 from './assets/images/selfden.jpg';
import image6 from './assets/images/special.jpg';
import image7 from './assets/images/Zipline2_1080.jpg';

import video from './assets/videos/747-xs.mp4';
import videoPoster from './assets/videos/747-xs.png';
import { useSwipeable } from 'react-swipeable';
import { useCallback, useEffect, useState } from 'react';


const AutoplaySlider = withAutoplay(AwesomeSlider);
const overlayClass = 'overlayed';

const setOverlayVisibility = (slide, visible) => {
  const overlayDiv = slide.querySelector('.awssld__content > div');

  if (visible) overlayDiv.classList.add(overlayClass);
  else overlayDiv.classList.remove(overlayClass);
};

const fadeInTexts = (slide, add = true) => {
  const slideTexts = slide.querySelectorAll('.slide-title, .slide-lead');

  let delay = 600;

  slideTexts.forEach((text) => {
    if (add) text.classList.add('fadeInUp');
    else text.classList.remove('fadeInUp');

    text.style.setProperty('transition-delay', `${delay}ms`);

    delay += 150;
  });
};

const transitionStartHandler = (info) => {
  const nextSlide =
    info.currentSlide.nextElementSibling ||
    info.currentSlide.previousElementSibling;

  setOverlayVisibility(nextSlide, false);
  fadeInTexts(nextSlide, false);
};

const transitionEndHandler = (info) => {
  const { currentSlide, element } = info;

  setOverlayVisibility(currentSlide, true);
  fadeInTexts(currentSlide, true);
  setParrallaxCSS(currentSlide, element, true);

  const previousSlide =
    currentSlide.nextElementSibling || currentSlide.previousElementSibling;

  setOverlayVisibility(previousSlide, false);
  fadeInTexts(previousSlide, false);
  setParrallaxCSS(previousSlide, element, false);
};

const mountHandler = (info) => {
  const { currentSlide, element } = info;

  window.setTimeout(() => {
    setOverlayVisibility(currentSlide, true);
    fadeInTexts(currentSlide, true);

    setParrallaxCSS(currentSlide, element, true);
  }, 300);
};

function setParrallaxCSS(slide, element, enable) {
  const parallax = () => {
    const slideContent = slide.firstElementChild;

    const controlButtons = Array.from(
      element.querySelectorAll('.awssld__controls button')
    );

    const y = window.scrollY;
    const h = element.offsetHeight;

    [slideContent, ...controlButtons].forEach((el) => {
      if (el)
        el.style.cssText += `
        margin-top: ${y / 2}px;
        opacity: ${1 - y / h};
        transition: none;
      `;
    });
  };

  enable
    ? window.addEventListener('scroll', parallax)
    : window.removeEventListener('scroll', parallax);
}

const awesomeSliderOptions = {
  onFirstMount: mountHandler,
  onTransitionStart: transitionStartHandler,
  onTransitionEnd: transitionEndHandler,
};

function Hero() {
  const [shouldPlay, setShouldPlay] = useState(true);

  const carouseSwipeHandler = useCallback(() => {
    setTimeout(() => {
      setShouldPlay(false);
    }, 1500);
  }, []);

  const { ref } = useSwipeable({
    onSwipedLeft: carouseSwipeHandler,
    onSwipedRight: carouseSwipeHandler,
  });

  useEffect(() => {
    const carouselEl = document.querySelector('.hero-carousel');

    ref(carouselEl);
  }, [ref]);

  return (
    <AutoplaySlider
      className='hero-carousel'
      {...awesomeSliderOptions}
      interval={7000}
      timerBackgroundColor='rgba(0, 0, 0, 0.25)'
      cancelOnInteraction
      play={shouldPlay}
    >
      <div style={{ backgroundImage: `url(${image1})` }}>
        <h1 className='slide-title'>Welcome to NetCams.io</h1>
        <p className='slide-lead'>
          Autonomous snapshots and video clips from IP Network Cameras for a
          variety of applications.
        </p>
      </div>

      <div style={{ backgroundImage: `url(${image2})` }}>
        <h1 className='slide-title'>Live Cams</h1>
        <p className='slide-lead'>
          (Well, almost live) <br /> Better image quality, more reliable, less
          complicated, and less expensive than a live video stream.
        </p>
        <p className='slide-lead'>
          Capture high resoltion snapshots at whatever intervals you choose.
          Visitors will always see the latest snapshot, plus historical images.
          <br />
          You may also overlay your logo, current weather conditions, and link
          back to your website.
        </p>
      </div>

      <div style={{ backgroundImage: `url(${image3})` }}>
        <h1 className='slide-title'>Parking Lots/Yards</h1>
        <p className='slide-lead'>
          Snapshots of vehicles entering or leaving your parking lot. Quick access
          to timestamped images of all activity at your facility.
        </p>
        <ul className='slide-lead'>
          <li>Deliveries</li>
          <li>Employees</li>
          <li>Asset tracking</li>
        </ul>
      </div>

      <div style={{ backgroundImage: `url(${image4})` }}>
        <h1 className='slide-title'>Time Lapse Cams</h1>
        <p className='slide-lead'>
          Set your camera to upload snapshots on a specific interval... one every
          second, one every day, or anywhere in between. Then create time-lapse
          videos from your snapshots to share online.
        </p>
        <ul className='slide-lead'>
          <li>Landscapes</li>
          <li>Cityscapes</li>
          <li>Construction Sites</li>
          <li>And More</li>
        </ul>
      </div>

      <div style={{ backgroundImage: `url(${image5})` }}>
        <h1 className='slide-title'>Selfie Cams</h1>
        <p className='slide-lead'>
          A Camera, a pushbutton, and a small single digit countdown display is
          all you need! Indoors or out. Set up a camera for your guests or vistors
          to take HD selfies with your backdrop and/or custom overlay and have it
          immediatly available on your NetCams channel for them to share.
        </p>
      </div>

      <div style={{ backgroundImage: `url(${image6})` }}>
        <h1 className='slide-title'>Special Events</h1>
        <p className='slide-lead'>
          Snapshots do not have to come from fixed IP cameras. Roving
          photographers at special events, concerts, festivals, sporting events,
          etc., can upload photos and have them displayed by date and time in the
          same way.
        </p>
        <ul className='slide-lead'>
          <li>Concerts</li>
          <li>Festivals</li>
          <li>Sporting Events</li>
        </ul>
      </div>

      <div style={{ backgroundImage: `url(${image7})` }}>
        <h1 className='slide-title'>Fast Action Cams</h1>
        <p className='slide-lead'>
          Roller coasters, water slides, zip-lines, and other fast moving objects.
          Set the camera to capture a burst of multiple snapshots (up to 30 per
          second) for your guests to select from. This replaces the traditional
          souveneir photo kiosk and can run unattended. Guests have immediate
          access online to view their photos and share.
        </p>
      </div>

      <div>
        <video
          playsInline
          autoPlay
          muted
          loop
          src={video}
          className='slide-bg-video'
          poster={videoPoster}
        />
        <h1 className='slide-title'>Capture Short Video Clips too!</h1>
        <p className='slide-lead'>
          Most Axis cameras are capable of capturing both still snapshots AND
          short video clips.
        </p>
      </div>
    </AutoplaySlider>
  );
}

export default Hero;

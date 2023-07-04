import React, { useRef } from "react";
import "./Slider.scss";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Slider = ({ children, slidesToShow, arrowsScroll }) => {
  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: slidesToShow,
    slidesToSlide: arrowsScroll // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 484 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
return(
  <div className="slide">
    <div className="contain">
    <Carousel responsive={responsive}>
      {children}
    </Carousel>
    </div>

  </div>
)
};

export default Slider;

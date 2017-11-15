import React from 'react';
import HeroImage from './images/mango.jpg';

const Hero = () => (
  <div className="container hero">
    <div className="row align-items-center">
      <div className="col-md-6 hero--content">
        <h1>Mango</h1>
        <p>It's back.</p>
        <a href="https://www.juulvapor.com/shop-pods/" role="button" className="btn btn-primary">Buy Now</a>
      </div>
      <div className="col-md-6 hero--image">
        <img src={HeroImage} />
      </div>
    </div>
  </div>
)

export default Hero;

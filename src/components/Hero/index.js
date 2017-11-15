import React from 'react';
import HeroImage from './images/mango.png';

const Hero = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h1>Mango is Back</h1>
        <p>Experience Intensely<br/>Satisfying Vapor</p>
        <a href="https://www.juulvapor.com/shop-pods/" role="button" className="btn btn-primary">Try Now</a>
        <div className="align-self-end">Now available for Auto-Ship</div>
      </div>
      <div className="col-md-6">
        <img src={HeroImage} />
      </div>
    </div>
  </div>
)

export default Hero;

import React from 'react';
import { Link, Button } from './NavItem';
import RegisterModal from '../Register/RegisterModal';

const Header = () => (
  <header>
    <div className="navbar navbar-expand-md content">
      <div className="col-auto">
        <div className="navbar-brand">
          <svg width="87" height="40">
            <g id="Logo_5_">
              <path className="juul-logo-fill" d="M50.9,0c-1.7,0-3.101,0-4.7,0c0,0.6,0,1.2,0,1.7c0,8.4,0,16.7,0,25.1c0,1,0.1,2,0.2,3.101c0.699,6.1,7,10.899,13.1,10
            C65.9,38.9,70,34.3,70,27.7c0-8.8,0-17.6,0-26.3c0-0.5,0-0.9,0-1.4c-1.6,0-3,0-4.6,0c0,0.6,0,1.2,0,1.7c0,8.7,0,17.4,0,26.1
            c0,3.2-1.4,5.7-4.4,7C56.2,36.9,51,33.4,51,28c0-8.7,0-17.5,0-26.2C50.9,1.2,50.9,0.6,50.9,0z M17.3,0c0,0.6,0,1.2,0,1.7
            c0,8.5,0,17,0,25.5c0,0.8,0,1.7,0.1,2.5c0.6,6.2,7,11.1,13.1,10.2C36.9,38.9,41,34.2,41,27.8c0-8.8,0-17.7,0-26.5
            c0.1-0.5,0-0.9,0-1.3c-1.6,0-3,0-4.6,0c0,0.7,0,1.2,0,1.8c0,8.7,0,17.4,0,26.101c0,4.3-3.3,7.6-7.5,7.399C25,35.2,22,31.9,22,27.7
            c0-8.7,0-17.4,0-26.1c0-0.5,0-1.1,0-1.6C20.4,0,18.9,0,17.3,0z M7.4,0c0,0.6,0,1.2,0,1.7c0,8.7,0,17.4,0,26.2
            c0,3.699-2.3,6.5-5.9,7.3c-0.4,0.1-0.9,0.2-1.3,0.2c0,1.6,0,3,0,4.6c0.3,0,0.5,0,0.8,0c6.6-0.7,11.1-5.6,11.1-12.2
            c0-8.8,0-17.6,0-26.5C12.1,0.9,12,0.5,12,0C10.5,0,9.1,0,7.4,0z M75.4,0C75.3,0.3,75.3,0.4,75.3,0.6c0,9.2,0,18.5,0,27.7
            c0,3.4,1.4,6.3,3.9,8.601c2.2,2,4.899,3,7.899,3.1c0-1.6,0-3.1,0-4.6C82.1,34.6,79.9,32,79.9,26.9c0-8.4,0-16.9,0-25.3
            c0-0.5,0-1.1,0-1.6C78.3,0,76.9,0,75.4,0z"></path>
              <path className="juul-logo-fill" d="M50.9,0c0,0.6,0,1.2,0,1.7c0,8.7,0,17.5,0,26.2c0,5.3,5.199,8.8,10,6.8c3-1.3,4.399-3.7,4.399-7c0-8.7,0-17.4,0-26.1
            c0-0.5,0-1.1,0-1.7c1.601,0,3,0,4.601,0C70,0.5,70,0.9,70,1.4c0,8.8,0,17.6,0,26.3c0,6.5-4.1,11.2-10.5,12.2
            c-6.1,0.899-12.4-3.9-13.1-10c-0.101-1-0.2-2-0.2-3.101c0-8.4,0-16.7,0-25.1c0-0.5,0-1.1,0-1.7C47.9,0,49.3,0,50.9,0z"></path>
              <path className="juul-logo-fill" d="M17.3,0c1.6,0,3,0,4.6,0c0,0.6,0,1.1,0,1.6c0,8.7,0,17.4,0,26.1c0,4.2,3,7.5,6.9,7.6c4.2,0.101,7.5-3.1,7.5-7.399
            c0-8.7,0-17.4,0-26.101c0-0.6,0-1.1,0-1.8c1.5,0,3,0,4.6,0c0,0.4,0.1,0.8,0.1,1.2c0,8.8,0,17.7,0,26.5c0,6.5-4.1,11.2-10.5,12.1
            c-6.1,0.9-12.5-4-13.1-10.2c-0.1-0.8-0.1-1.699-0.1-2.5c0-8.5,0-17,0-25.5C17.3,1.2,17.3,0.6,17.3,0z"></path>
              <path className="juul-logo-fill" d="M7.4,0c1.7,0,3.1,0,4.6,0c0,0.5,0.1,0.9,0.1,1.3c0,8.8,0,17.6,0,26.5C12.1,34.4,7.6,39.3,1,40c-0.2,0-0.4,0-0.8,0
            c0-1.5,0-3,0-4.6C0.6,35.3,1.1,35.3,1.5,35.2c3.6-0.8,5.8-3.601,5.9-7.3c0-8.7,0-17.4,0-26.2C7.4,1.2,7.4,0.6,7.4,0z"></path>
              <path className="juul-logo-fill" d="M75.4,0C76.9,0,78.3,0,80,0c0,0.5,0,1.1,0,1.6c0,8.4,0,16.9,0,25.3c0,5.1,2.2,7.6,7.2,8.5c0,1.5,0,2.899,0,4.6
            c-3.101,0-5.7-1.1-7.9-3.1C76.8,34.6,75.4,31.7,75.4,28.3c-0.101-9.2,0-18.5,0-27.7C75.2,0.4,75.3,0.3,75.4,0z"></path>
            </g>
          </svg>
        </div>
      </div>
      <button className="btn btn-link navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      <div id="nav" className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <Link name="Shop" link="https://www.juulvapor.com/shop-juul" />
          <Link name="Store Locator" link="https://www.juulvapor.com/locator/" />
          <Link name="Support" link="https://support.juulvapor.com/" />
          <Button btnClass="btn btn-dark" name="Sign Up" data-toggle="modal" data-target="#registerModal" />
        </ul>
      </div>
    </div>
    <RegisterModal />
  </header>
);

export default Header;

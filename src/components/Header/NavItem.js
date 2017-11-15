import React from 'react';

const Link = ({link, name}) => (
  <li className="nav-item">
    <a href={link} className="nav-link">{name}</a>
  </li>
)

const Button = ({btnClass, name, ...other}) => (
  <li className="nav-item">
    <button type="button" className={`nav-link btn ${btnClass}`} {...other}>
      {name}
    </button>
  </li>
)

export { Link, Button };

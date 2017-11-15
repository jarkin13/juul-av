import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import Tether from 'tether';
import Popper from 'popper.js';

window.jQuery = $;
window.$ = $;
window.Tether = Tether;
window.Popper = Popper;

const { Modal, Collapse } = require('bootstrap');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import Register from '../Register/index';

class RegisterModal extends Component {
  render() {
    return (
      <div className="App">
        <div className="modal" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center">

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">x</button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <Register />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterModal;

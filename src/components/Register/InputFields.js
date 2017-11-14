import React, { Component } from 'react'
import PropTypes from 'prop-types';

// TEXT FIELD
class TextField extends Component {
  handleKeyPress(e) {
    let input = this.props;
    if( input.options && input.options.numeric ) {
      let isNum = e.charCode >= 48 && e.charCode <= 57;
      if( !isNum ) {
        e.preventDefault();
      }
    }
  }

  onInputChange(e) {
    this.props.handleUserInput(e);
  }

  handleKeyUp(e) {
    let input = this.props;
    if( input.options && input.options.format ) {
      for( let i = 0; i < input.options.locations.length; i++ ) {
        if( e.target.value.length === input.options.locations[i] && e.keyCode !== 8 ) {
          let value = e.target.value + input.options.separator;
          e.target.value = value;
          this.props.handleUserInput(e);
        }
      }
    }
  }

  render() {
    return (
      <div className={`form-group ${this.props.groupClass}`}>
        <label htmlFor={this.props.input}>{this.props.inputName}</label>
        <input id={this.props.id} type={this.props.type} className="form-control" name={this.props.input} placeholder={this.props.placeholder} value={this.props.value} onChange={(event) => this.onInputChange(event)} minLength={this.props.min} maxLength={this.props.max} onKeyPress={(event) => this.handleKeyPress(event)} onKeyUp={(event) => this.handleKeyUp(event)} required />
      </div>
    )
  }
};

TextField.propTypes = {
  error: PropTypes.string,
  groupClass: PropTypes.string,
  input: PropTypes.string,
  inputName: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleUserInput: PropTypes.func,
};

// FORM ERROR
const FormError = ({formError, formClass}) => (
  <div className={formClass}>
    <p>{formError}</p>
  </div>
)

FormError.propTypes = {
  formError: PropTypes.string,
};

export { TextField, FormError };

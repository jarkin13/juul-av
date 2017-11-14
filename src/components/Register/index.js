import React, { Component } from 'react';
import request from 'superagent';
import { TextField, FormError } from './InputFields';
import Autocomplete from './Autocomplete';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      address: {
        value: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      },
      dob: '',
      ssn: '',
      fieldValid: {
        first: false,
        last: false,
        address: false,
        dob: false,
        ssn: false,
      },
      formErrors: {
        first: '',
        last: '',
        address: '',
        dob: '',
        ssn: '',
      },
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const inputName = this.refs[name].props.inputName
    this.setState({[name]: value}, () => {
      this.handleValidateField(name, value, inputName);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = "https://av-interview.juul.com/";
    request
      .post(url)
      .send({
        first_name: this.state.first,
        last_name: this.state.last,
        address_line1: this.state.address.address,
        city: this.state.address.city,
        state: this.state.address.state,
        zip_code: this.state.address.zip_code,
        dob: this.state.dob,
        ssn: this.state.ssn
      })
      .set('accept', 'json')
      .end((err, res) => {
        let msg = JSON.parse(res.text);
        console.log(msg);
      });
  }

  handleValidateField(field, value, inputName) {
    let isValid = this.state.fieldValid[field];
    let errorMsg = this.state.formErrors[field];
    let fieldData = {
      fieldValid: this.state.fieldValid,
      formErrors: this.state.formErrors
    };

    if( field === 'address' ) value = value.value;

    isValid = this.isNotEmpty(value);
    errorMsg = isValid ? '' : `${inputName} is required.`;

    switch(field) {
      case 'dob':
        isValid = this.isValidDate(value);
        errorMsg = isValid ? '' : 'Format must be MM/DD/YYYY.';
        break;
      case 'ssn':
        let pattern = new RegExp(/^\d{3}-\d{2}-\d{4}$/);
        isValid = pattern.test(value);
        errorMsg = isValid ? '' : 'Format must be XXX-XX-XXXX.';
        break;
      default:
        break;
    }

    fieldData.fieldValid[field] = isValid;
    fieldData.formErrors[field] = errorMsg;

    this.setState( fieldData, this.validateForm );
  }

  validateForm() {
    let valid = this.state.fieldValid;
    this.setState({ formValid: valid.first && valid.last && valid.address && valid.dob && valid.ssn });
  }

  isNotEmpty(value) {
    if(value.length < 1) {
      return false;
    }
    return true;
  }

  isValidDate(dateString) {
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    let parts = dateString.split("/");
    let day = parseInt(parts[1], 10);
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

  getSeperatorLocations(options) {
    if(options) {
      let separate = [];
      for( let i = 0; i < options.format.length; i ++ ) {
        if( options.format[i] === options.separator ) {
          separate.push(i);
        }
      }
      return separate;
    }
  }

  render() {
    let dobOptions = {
      numeric: true,
      format: 'xx/xx/xxxx',
      separator: '/'
    }
    dobOptions.locations = this.getSeperatorLocations(dobOptions)

    let ssnOptions = {
      numeric: true,
      format: 'xxx-xx-xxxx',
      separator: '-'
    }
    ssnOptions.locations = this.getSeperatorLocations(ssnOptions)

    return (
      <div className="container">
        <form id="becomeLeader">
          <div className="row">
            <TextField
              input="first"
              inputName="First Name"
              type="text"
              groupClass={`col-12 col-md ${this.errorClass(this.state.formErrors.first)}`}
              id="first"
              placeholder="First Name"
              value={this.state.first}
              handleUserInput={this.handleUserInput}
              ref="first" />
            <TextField
              input="last"
              inputName="Last Name"
              type="text" groupClass={`col-12 col-md ${this.errorClass(this.state.formErrors.last)}`}
              id="last"
              placeholder="Last Name"
              value={this.state.last}
              handleUserInput={this.handleUserInput}
              ref="last" />
          </div>
          <div className="row">
            <FormError formError={this.state.formErrors.first} formClass={`col-12 col-md ${this.errorClass(this.state.formErrors.first)}-msg`} />
            <FormError formError={this.state.formErrors.last} formClass={`col-12 col-md ${this.errorClass(this.state.formErrors.last)}-msg`} />
          </div>
          <div className="row">
            <div className={`form-group col-12 col-md ${this.errorClass(this.state.formErrors.address)}`} >
              <label htmlFor="address">Address</label>
              <div className="input-group">
                <Autocomplete
                  value={this.state.address.value}
                  onChange={(event) => this.handleUserInput(event)}
                  inputName="Address"
                  ref="address" />
              </div>
            </div>
          </div>
          <div className="row">
            <FormError formError={this.state.formErrors.address} formClass={`col-12 col-md ${this.errorClass(this.state.formErrors.address)}-msg`} />
          </div>
          <div className="row">
            <TextField
              input="dob"
              inputName="Date of Birth"
              options={dobOptions}
              type="text"
              groupClass={`col-12 col-md ${this.errorClass(this.state.formErrors.dob)}`}
              id="dob"
              placeholder="MM/DD/YYYY"
              value={this.state.dob}
              handleUserInput={this.handleUserInput} max="10"
              ref="dob" />
            <TextField
              input="ssn"
              inputName="SSN"
              type="text"
              options={ssnOptions}
              groupClass={`col-12 col-md ${this.errorClass(this.state.formErrors.dob)}`}
              id="ssn"
              placeholder="XXX-XX-XXXX"
              value={this.state.ssn}
              handleUserInput={this.handleUserInput} min="11" max="11"
              ref="ssn" />
          </div>
          <div className="row">
            <FormError formError={this.state.formErrors.dob} formClass={`col-12 col-md ${this.errorClass(this.state.formErrors.dob)}-msg`} />
            <FormError formError={this.state.formErrors.ssn} formClass={`col-12 col-md ${this.errorClass(this.state.formErrors.ssn)}-msg`} />
          </div>
          <div className="row">
            <div className="col-auto mr-auto"></div>
            <div className="col">
              <button type="submit" className="btn btn-primary float-right" onClick={(event) => this.handleSubmit(event)} disabled={!this.state.formValid}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Form;

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      data: {
        value: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      }
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onHandleSelect = this.onHandleSelect.bind(this);
  }

  onInputChange(address) {
    const target = {
      target: {
        placeholder: 'Address',
        name: 'address',
        value: {
          value: address
        }
      }
    }

    this.setState({ address: address }, () => {
      this.props.onChange(target);
    });
  }

  onHandleSelect(address) {
    const componentTypes = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      sublocality_level_1: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };

    const addressData = {
      street_number: '',
      route: '',
      locality: '',
      sublocality_level_1: '',
      administrative_area_level_1: '',
      postal_code: '',
    };

    geocodeByAddress(address)
      .then(results => {
        for (var i = 0; i < results[0].address_components.length; i++) {
          var addressTypes = results[0].address_components[i].types;
          for( var t = 0; t < addressTypes.length; t++ ) {
            if (componentTypes[addressTypes[t]]) {
              var val = results[0].address_components[i][componentTypes[addressTypes[t]]];
              addressData[addressTypes[t]] = val;
            }
          }
        }

        if( addressData['locality'].length === 0 ) {
          addressData['locality'] = addressData['sublocality_level_1'];
        };

        this.setState({
          data: {
            value: address,
            address: `${addressData['street_number']} ${addressData['route']}`,
            city: addressData['locality'],
            state: addressData['administrative_area_level_1'],
            zip_code: addressData['postal_code']
          }
        }, () => {
          const target = {
            target: {
              placeholder: 'Address',
              name: 'address',
              value: this.state.data
            }
          }
          this.props.onChange(target);
        });
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.props.value,
      onChange: this.onInputChange,
      id: 'address',
      required: true
    }

    const options = {
      types: ['address'],
    }

    const cssClasses = {
      root: 'address-input',
      input: `form-control`,
    }

    const styles = {
      autocompleteContainer: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        border: '1px solid #eee',
        width: '100%',
        zIndex: '999999',
        left: '0'
      },
      autocompleteItem: {
        backgroundColor: '#ffffff',
        padding: '10px',
        color: '#555555',
        cursor: 'pointer',
      },
      autocompleteItemActive: {
        backgroundColor: '#eee'
      }
    }

    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/> {suggestion}</div>);
    return (
      <PlacesAutocomplete inputProps={inputProps} onSelect={this.onHandleSelect} options={options} styles={styles} classNames={cssClasses} autocompleteItem={AutocompleteItem}/>
    )
  }
}

Autocomplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Autocomplete;

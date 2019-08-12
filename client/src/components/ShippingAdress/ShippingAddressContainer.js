import React from 'react';
import ShippingAddressComponent from './ShippingAddressComponent';

class ShippingAddressContainer extends React.Component {
    state = {
        address1: "",
        address2: "",
        state: "",
        city: "",
        phoneNumber: "",
        mobileNumber: ""
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    checkRegistrationFields = (e) => {
        e.preventDefault();
        let form = document.querySelector('.needs-validation');
        e.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
            this.addOrder();
        }
        form.classList.add('was-validated');
    }
    addOrder = () => {
        let user = {
            'address1': this.state.address1,
            'address2': this.state.address2,
            'city': this.state.city,
            'state': this.state.state,
            'phoneNumber': this.state.mobileNumber,
            'mobileNumber': this.state.phoneNumber
        };
        fetch(`/userapi/addorder?userId=${document.cookie.split('=')[1]}`, {
        }).then( (response)=> {
            return response.json();
        }).then( (data)=> {
            this.props.updateState('shippingAddress',user);
            this.updateOrdered(data);
            })

    }
    updateOrdered=(data)=>{
        //this.props.history.push('')
        let ordered = data.ordered;
        console.log(ordered);
    }
    changeCity = (event) => {
        let state = document.querySelector('#state');
        let city = document.querySelector('#city');
        while (city.firstChild) {
            city.removeChild(city.firstChild);
        }
        fetch(`/cityapi/getCities?state=${state.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach((item) => {
                    let cityElement = document.createElement('option');
                    cityElement.setAttribute('value', item);
                    cityElement.textContent = item;
                    city.append(cityElement);
                })
                this.setState({
                    state: state.value
                })
            })
    }
    render() {
        return (
            <ShippingAddressComponent handleChange={this.handleChange}
                state={this.props.state}
                changeCity={this.changeCity}
                checkRegistrationFields={this.checkRegistrationFields} />
        )
    }
}

export default ShippingAddressContainer;
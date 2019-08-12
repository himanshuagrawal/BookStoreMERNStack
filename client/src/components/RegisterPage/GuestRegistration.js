import React from 'react';
import '../../assets/CSS/GuestRegistration.css';
import StateOption from '../SelectOptions/StateOptions';
import $ from 'jquery';

class GuestRegistration extends React.Component {
    constructor() {
        super();
        this.check = false;
    }

    openLogin() {
        let form = document.querySelector('.needs-validation');
        form.classList.remove('was-validated');
        form.reset();
        document.querySelector('#registrationSuccessful').style.display = "block";
        window.$('#loginModal').modal('show');
    }
    checkPreferredUserName = () => {
        fetch(`/userapi/checkpreferredusername?name=${$('#preferredLoginName').val()}`)
            .then(function (response) {
                return response.text();
            })
            .then((data) => {
                if (data === "true") {
                    document.querySelector('#preferredLoginNameSmall').style.display = "inline";
                    this.check = false;
                } else {
                    this.check = true;
                }
            });
    }
    componentDidMount = () => {
        $('#loginPassword').on('focus', () => { document.querySelector('#passwordHelpBlock').style.display = "block" });
        $('#loginPassword').on('blur', () => { document.querySelector('#passwordHelpBlock').style.display = "none" });
        $('#reTypePassword').on('blur', () => {
            if ($('#loginPassword').val() !== $('#reTypePassword').val()) {
                document.querySelector('#reTypePasswordSmall').style.display = "inline"
            } else {
                document.querySelector('#reTypePasswordSmall').style.display = "none"
            }
        });
        $('#preferredLoginName').on('blur', () => {
            this.checkPreferredUserName();
        });
        $('#preferredLoginName').on('focus', () => {
            document.querySelector('#preferredLoginNameSmall').style.display = "none";
        })

    }
    checkRegistrationFields = (e) => {
        e.preventDefault();
        let form = document.querySelector('.needs-validation');
        if (form.checkValidity() === false) {
        } else {
            if ($('#loginPassword').val() !== $('#reTypePassword').val()) {
                document.querySelector('#reTypePasswordSmall').style.display = "inline"
            } else {
                this.addUser();
            }
        }
        form.classList.add('was-validated');
    }
    addUser = () => {
        if (this.check) {
            let user = {
                'fullName': $('#fullName').val(),
                'preferredLoginName': $('#preferredLoginName').val(),
                'password': $('#loginPassword').val(),
                'email': $('#email').val(),
                'address1': $('#addressLine1').val(),
                'address2': $('#addressLine2').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'phoneNumber': $('#phoneNumber').val(),
                'mobileNumber': $('#mobileNumber').val(),
            };
            fetch('/userapi/adduser', {
                method: "Post",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                this.openLogin();
            })
        }
    }
    changeCity = () => {
        let state = document.querySelector('#state');
        let city = document.querySelector('#city');
        while (city.firstChild) {
            city.removeChild(city.firstChild);
        }
        fetch(`/cityapi/getCities?state=${state.value}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.forEach(function (item) {
                    let cityElement = document.createElement('option');
                    cityElement.setAttribute('value', item);
                    cityElement.textContent = item;
                    city.append(cityElement);
                })
            })
    }
    render() {
        return (
            <div className="col-xl-9 register-page">
                <h2 className="register-page-heading" id="registerPageHeading">Customer Registration</h2>
                <div className="register-form">
                    <form className="needs-validation" noValidate onSubmit={this.checkRegistrationFields}>
                        <div className="form-group row">
                            <label htmlFor="fullName" className="col-sm-3 col-form-label">Full Name<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="fullName" style={{ 'width': 70 + '%' }} required></input>
                                <div className="invalid-feedback">
                                    Please enter a valid name.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="preferredLoginName" className="col-sm-3 col-form-label">Preferred Login Name<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="preferredLoginName" required></input>
                                <small id="preferredLoginNameSmall" className="text-muted" style={{ 'display': 'none' }}>Username
                                    already
                                    exists!</small>
                                <div className="invalid-feedback">
                                    Please enter a valid Preferred Login Name.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="loginPassword" className="col-sm-3 col-form-label">Login Password<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" id="loginPassword" required pattern=".{6,15}"></input>
                                <small id="passwordHelpBlock" className="form-text text-muted" style={{ 'display': 'none' }}>Your
                                    password should contain more than 6 characters .!
                                </small>
                                <div className="invalid-feedback">
                                    Password doesn't match the required criteria.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="reTypePassword" className="col-sm-3 col-form-label">ReType Password<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" id="reTypePassword" required></input>
                                <small id="reTypePasswordSmall" style={{ 'display': 'none' }}>Password
                                    doesn't match</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="email" required></input>
                                <div className="invalid-feedback">
                                    Please enter a valid email id.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="addressLine1" className="col-sm-3 col-form-label">Address Line 1<span
                                className="required-star">*</span></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="addressLine1" required></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="addressLine2" className="col-sm-3 col-form-label">Address Line 2</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="addressLine2"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Select State</label>
                            <div className="col-sm-9">
                                <StateOption changeCity={this.changeCity} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Select City</label>
                            <div className="col-sm-9">
                                <select className="form-control" id="city">
                                    <option value="Port Blair">Port Blair</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="phoneNumber" maxLength="10"></input>
                                <div className="invalid-feedback">
                                    Please enter a valid phone number.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="mobileNumber" className="col-sm-3 col-form-label">Mobile Number</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="mobileNumber" maxLength="10"></input>
                                <div className="invalid-feedback">
                                    Please enter a valid mobile number.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9">
                                <button type="submit" className="btn btn-primary submitButton">Create Profile</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default GuestRegistration;

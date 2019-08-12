import React from 'react';
import StateOptions from '../SelectOptions/StateOptions';
import '../../assets/CSS/ShippingAddress.css';

function ShippingAddressComponent(props){
    return(
        <div className="col-xl-9 shipping-address-container">
        <h2 className="shipping-address-heading" id="shippingAddressHeading">Shipping Address</h2>
        <div className="register-form">
                <form className="needs-validation" noValidate onSubmit={props.checkRegistrationFields}>
                    <div className="form-group row">
                        <label htmlFor="fullName" className="col-sm-3 col-form-label">Customer Name<span
                                className="required-star">*</span></label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="fullName" value={props.state.userDetails.fullName} style={{'width':70+'%'}} disabled />
                            <div className="invalid-feedback">
                                Please enter a valid name.
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="addressLine1" className="col-sm-3 col-form-label">Address Line 1<span
                                className="required-star">*</span></label>
                        <div className="col-sm-9">
                            <input type="text" name="address1" className="form-control" id="addressLine1" required onChange={props.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="addressLine2" className="col-sm-3 col-form-label">Address Line 2</label>
                        <div className="col-sm-9">
                            <input type="text" name="address1" className="form-control" id="addressLine2" onChange={props.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Select State</label>
                        <div className="col-sm-9">
                                    <StateOptions changeCity={props.changeCity}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Select City</label>
                        <div className="col-sm-9">
                                <select className="form-control" name="city" id="city" onChange={props.handleChange}>
                                    <option value="Port Blair">Port Blair</option>
                                </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="phoneNumber" maxLength="10" name="phoneNumber" onChange={props.handleChange} />
                            <div className="invalid-feedback">
                                Please enter a valid phone number.
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="mobileNumber" className="col-sm-3 col-form-label">Mobile Number<span
                            className="required-star">*</span></label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="mobileNumber" maxLength="10" required name="mobileNumber" onChange={props.handleChange}/>
                            <div className="invalid-feedback">
                                Please enter a valid mobile number.
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                        <button type="submit" className="btn btn-primary submitButton">Save and Continue</button>
                    </div>
                    </div>
                </form>
            </div>
    </div>
    )
}

export default ShippingAddressComponent;
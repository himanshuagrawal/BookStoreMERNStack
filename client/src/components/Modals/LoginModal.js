import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/CSS/Modals/LoginModal.css';
import {withRouter} from 'react-router-dom';

class LoginModal extends React.Component {
    checkUserLogin=()=> {
        let props = this.props;
        let obj = {
            'preferredLoginName': document.querySelector('#loginModalUsername').value,
            'password': document.querySelector('#loginModalPassword').value
        }
        fetch('/userapi/authenticateuser', {
            headers: {
                'password': obj.password,
                'preferredLoginName': obj.preferredLoginName
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.auth === false) {
                document.querySelector('#loginFailed').style.display = "block";
            } else {
                 window.$('#loginModal').modal('hide');
                 props.updateState(data);
            }
        })
    }
    redirectToRegisterPage=()=>{
        window.$('#loginModal').modal('hide');
        this.props.history.push('register');
    }
    render() {
        return ReactDOM.createPortal(
            <div className="modal fade" id="loginModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <h6 id="registrationSuccessful">You are registered. Please login to contine.</h6>
                        <div className="login-modal-username">
                            <h5 className="login-modal-username-title">User Name <span className="required-star">*</span></h5>
                            <input type="text" className="login-modal-username-input" id="loginModalUsername" />
                        </div>
                        <div className="login-modal-password">
                            <h5 className="login-modal-password-title">Password <span className="required-star">*</span></h5>
                            <span className="login-modal-password-forgot" id="loginModalForgotPassword">Forgot Password?</span>
                            <input type="text" className="login-modal-password-input" id="loginModalPassword" />
                            <h6 id="loginFailed">Wrong Username or password</h6>
                        </div>
                        <button className="btn btn-primary login-button" id="loginButton" onClick={this.checkUserLogin}>Log In</button>
                        <h5 className="login-modal-register-title">Don't have an account yet?</h5>
                        <button className="btn btn-danger register-button" id="registerButton" onClick={this.redirectToRegisterPage}>Register</button>
                    </div>
                </div>
            </div>,document.getElementById('modals')
        )
    }
}
export default withRouter(LoginModal);
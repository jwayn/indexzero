import React, { Component } from 'react';

import './Login.css';
import AuthContext from '../context/auth-context';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import InfoText from './InfoText';

export default class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loginActive: true,
        }
    }

    closeInfo = () => {
        this.setState({infoText: ''});
    }

    showSignupForm = () => {
        this.setState({
            loginActive: false
        });
    }

    showLoginForm = () => {
        this.setState({
            loginActive: true
        })
    }

    updateInfoText = (text) => {
        this.setState({infoText: text})
    }

    render() {
        return (
            <div className="login-form">
                {this.state.infoText && <InfoText text={this.state.infoText} closeInfo={this.closeInfo} />}
                <div className="login-form__selector">
                    <ul>
                        <li className={this.state.loginActive ? "login-form__selector__item" : "login-form__selector__item login-form__selector__item--active"} onClick={this.showSignupForm}>Sign Up</li>
                        <li className={this.state.loginActive ? "login-form__selector__item login-form__selector__item--active" : "login-form__selector__item"} onClick={this.showLoginForm}>Login</li>
                    </ul>
                </div>
                {this.state.loginActive ? <LoginForm updateInfo={this.updateInfoText} /> : <SignupForm updateInfo={this.updateInfoText} />}
            </div>
        );
    }
}
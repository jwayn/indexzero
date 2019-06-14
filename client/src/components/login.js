import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="login-signup">
                <button className="button login__button" onClick={this.login}>Login</button>
                <button className="button login__button" onClick={this.signup}>Signup</button>
            </div>
        );
    }
}
import React, { Component } from 'react';

import './Login.css';
import AuthContext from '../context/auth-context';

export default class LoginForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();

        this.state = {
            loginAttempts: 0
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    incrementAttempts = () => {
        this.setState({loginAttempts: this.state.loginAttempts + 1});
    }

    loginHandler = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        this.incrementAttempts();

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
            const body = JSON.stringify({
                email: email,
                password: password
            });
            await fetch('/api/auth/login', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(rawRes => {
                return rawRes.json();
            }).then(res => {
                console.log('Response: ', res);
                if (res.token) {
                    this.context.login(res.token, res.userId, res.verified);
                } else {
                    this.props.updateInfo(res.message);
                    this.passwordEl.current.value = '';
                }     
            })
        }
    }

    render() {
        return (
            <div>
                <form className="login__form">
                    <label>Email</label>
                    <input type="email" name="email" ref={this.emailEl} autoFocus />
                    <label>Password</label>
                    <input type="password" name="password" ref={this.passwordEl} />
                    <div className="button-group">
                        <button className="button" onClick={this.loginHandler}>Login</button>
                    </div>
                </form>
                {this.state.loginAttempts > 3 && 
                <div className="login__form__forgot-password">
                    Forgot your password?
                </div>
                }
            </div>
        );
    }
}
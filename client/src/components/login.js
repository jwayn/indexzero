import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';
import AuthContext from '../context/auth-context';

export default class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    loginHandler = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
        const body = JSON.stringify({
            email: email,
            password: password
        });
            const rawRes = await fetch('/api/auth/login', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const res = await rawRes.json();
            if (res.token) {
                this.context.login(res.token, res.userId);
            }

            return <Redirect to="/recent" />;
        }
    }

    signUpHandler = async () => {
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
            const body = JSON.stringify({
                email: email,
                password: password
            });
            const rawRes = await fetch('/api/auth/login', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const res = await rawRes.json();
            if (res.token) {
                this.context.login(res.token, res.userId);
            }

            return <Redirect to="/recent" />;
        }
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.loginHandler} className="login__form">
                    <label>Email</label>
                    <input type="email" name="email" ref={this.emailEl} />
                    <label>Password</label>
                    <input type="password" name="password" ref={this.passwordEl} />
                    <div className="login__form__button-group">
                        <button className="button" onClick={this.signUp}>Sign Up</button>
                        <button className="button" type='submit'>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
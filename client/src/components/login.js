import React, { Component } from 'react';

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
        console.log('Hello!');
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        console.log(email, password);

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
            const body = JSON.stringify({
                email: email,
                password: password
            });
            console.log(body);
            const rawRes = await fetch('/api/auth/login', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const res = await rawRes.json();
            console.log(res);
            /***********************************/
            /* TODO:                           */
            /* THROW THE RES INTO AUTHCONTEXT! */
            /***********************************/
        }
    }

    signUpHandler = () => {

    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.loginHandler}>
                    <label>Email</label>
                    <input type="email" name="email" ref={this.emailEl} />
                    <label>Password</label>
                    <input type="password" name="password" ref={this.passwordEl} />
                    <button className="button login__button" onClick={this.signUp}>Sign Up</button>
                    <button className="button login__button" type='submit'>Login</button>
                </form>
            </div>
        );
    }
}
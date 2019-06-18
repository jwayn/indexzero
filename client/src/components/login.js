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

    loginHandler = (event) => {
        console.log('Hello!');
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
            fetch('/api/login', {
                method: 'POST',
                body: {
                    email,
                    password
                },
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(data => data.json())
            .then(json => console.log(json));
        }
    }

    signUpHandler = () => {

    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.submitHandler}>
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
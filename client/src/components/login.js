import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';
import AuthContext from '../context/auth-context';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

import inputValid from '../images/checkbox_circle.svg';
import inputInvalid from '../images/x-circle.svg';

export default class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.passwordVerEl = React.createRef();
        this.displayName = React.createRef();

        this.state = {
            form: (
                <form className="login__form">
                    <label>Email</label>
                    <input type="email" name="email" ref={this.emailEl} />
                    <label>Password</label>
                    <input type="password" name="password" ref={this.passwordEl} />
                    <div className="button-group">
                        <button className="button" onClick={this.loginHandler}>Login</button>
                    </div>
                </form>
            ),
            loginActive: true,
            passwordLength: false,
            passwordUpper: false,
            passwordLower: false,
            passwordSpecial: false,
            passwordMatch: false
        }
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
                this.props.history.push(`/recent`);
            } else {
                // Set state for failed auth
            }     
        }
    }

    handleSignupEmailChange = (event) => {
        const email = event.target.value;
        if(this.validateEmail(email)) {
            this.setState({emailValid: true})
        } else {
            this.setState({emailValid: false})
        }
    }

    handleSignupPasswordChange = (event) => {
        const password = this.passwordEl.current.value;
        const passwordVer = this.passwordVerEl.current.value;
        if(password === passwordVer) {
            this.setState({passMatchUrl: inputValid});
        } else {
            this.setState({passMatchUrl: inputInvalid});
        }

        if(password.trim().length >= 6) {
            this.setState({passLengthUrl: inputValid});
        } else {
            this.setState({passLengthUrl: inputInvalid});
        }

        if(password.trim().match(/[A-Z]/g)){
            this.setState({passUpperUrl: inputValid});
        } else {
            this.setState({passUpperUrl: inputInvalid});
        }

        if(password.trim().match(/[a-z]/g)){
            this.setState({passLowerUrl: inputValid});
        } else {
            this.setState({passLowerUrl: inputInvalid});
        }

        if(password.trim().match(/[0-9]/g)){
            this.setState({passNumberUrl: inputValid});
        } else {
            this.setState({passNumberUrl: inputInvalid});
        }

        if(password.trim().match(/[^A-Za-z 0-9]/g)) {
            this.setState({passSpecialUrl: inputValid});
        } else {
            this.setState({passwordSpecial: inputInvalid});
        }
    }

    signUpHandler = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const passwordVer = this.passwordVerEl.current.value;
        const displayName = this.displayName.current.value;

        if(email.trim().length === 0 || password.trim().length === 0
            || passwordVer.trim().length === 0 || displayName.trim().length === 0) {
            return;
        }

        if (this.validateEmail(email)) {
            const body = JSON.stringify({
                email: email,
                password: password,
                display_name: displayName
            });
            const rawRes = await fetch('/api/auth/signup', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if(rawRes.status == 200) {
                const res = await rawRes.json();
                if (res.token) {
                    this.context.login(res.token, res.userId);
                    localStorage.setItem('jwtToken', res.token);
                    localStorage.setItem('userId', res.userId);
                    this.props.history.push(`/recent`);
                }
            }
        } else {
            this.setState({infoText: 'Invalid email.'})
        }
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

    render() {
        return (
            <div className="login-form">
                <div className="login-form__info">
                    <div className="login-form__info__icon" />
                    <div className="login-form__info__content">
                        {this.state.infoText}
                    </div>
                </div>
                <div className="login-form__selector">
                    <ul>
                        <li className={this.state.loginActive ? "login-form__selector__item" : "login-form__selector__item login-form__selector__item--active"} onClick={this.showSignupForm}>Sign Up</li>
                        <li className={this.state.loginActive ? "login-form__selector__item login-form__selector__item--active" : "login-form__selector__item"} onClick={this.showLoginForm}>Login</li>
                    </ul>
                </div>
                {this.state.loginActive ? <LoginForm /> : <SignupForm />}
            </div>
        );
    }
}
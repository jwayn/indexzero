import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

import './Login.css';

import inputValid from '../images/checkbox_circle.svg';
import inputInvalid from '../images/x-circle.svg';

export default class SignupForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.passwordVerEl = React.createRef();
        this.displayName = React.createRef();

        this.state = {
            passMatch: false,
            passLength: false,
            passUpper: false,
            passLower: false,
            passSpecial: false,
            passMatch: false,
            loaderActive: false,
            passEmpty: true,
            emailEmpty: true
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) || email.trim().length === 0;
    }

    handleSignupEmailChange = (event) => {
        const email = event.target.value;
        if(this.validateEmail(email)) {
            this.setState({emailValid: true})
        } else {
            this.setState({emailValid: false})
        }

        if(email.trim().length > 0) {
            this.setState({emailEmpty: false})
        } else {
            this.setState({emailEmpty: true})
        }
    }

    handleSignupPasswordChange = (event) => {
        const password = this.passwordEl.current.value;
        const passwordVer = this.passwordVerEl.current.value;
        if(password.trim().length > 0 && passwordVer.trim().length > 0) {
            this.setState({passEmpty: false})
        } else {
            this.setState({passEmpty: true})
        }

        if(password === passwordVer) {
            this.setState({passMatch: true});
        } else {
            this.setState({passMatch: false});
        }

        if(password.trim().length >= 6) {
            this.setState({passLength: true});
        } else {
            this.setState({passLength: false});
        }

        if(password.trim().match(/[A-Z]/g)){
            this.setState({passUpper: true});
        } else {
            this.setState({passUpper: false});
        }

        if(password.trim().match(/[a-z]/g)){
            this.setState({passLower: true});
        } else {
            this.setState({passLower: false});
        }

        if(password.trim().match(/[0-9]/g)){
            this.setState({passNum: true});
        } else {
            this.setState({passNum: false});
        }

        if(password.trim().match(/[^A-Za-z 0-9]/g)) {
            this.setState({passSpecial: true});
        } else {
            this.setState({passSpecial: false});
        }
    }

    signUpHandler = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const passwordVer = this.passwordVerEl.current.value;
        const displayName = this.displayName.current.value;

        if(email.trim().length === 0 || password.trim().length === 0
            || passwordVer.trim().length === 0 || displayName.trim().length === 0 || !this.passwordValid()) {
            this.props.updateInfo('Form invalid.')
            return;
        }

        this.setState({loaderActive: true});
        if (this.validateEmail(email)) {
            const body = JSON.stringify({
                email,
                password,
                displayName
            });
            const rawRes = await fetch('/api/auth/signup', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(rawRes => {
                this.setState({loaderActive: false});
                return rawRes.json();
            }).then(res => {
                if (res.token) {
                    this.context.login(res.token, res.userId);
                } else {
                    this.props.updateInfo(res.message);
                    this.emailEl.current.value = '';
                }
            })
        } else {
            this.props.updateInfo('Invalid email.');
        }
    }

    passwordValid = () => {
        return this.state.passLength && 
               this.state.passMatch && 
               this.state.passLower && 
               this.state.passUpper && 
               this.state.passSpecial && 
               this.state.passNum;
    }

    render() {
        return (
            <div className="login-form__signup-container">
                <form className="login__form">
                    <label>Email</label>
                    <input type="email" name="email" className={this.state.emailValid || this.state.emailEmpty ? 'input--valid' : 'input--invalid'} onChange={this.handleSignupEmailChange} ref={this.emailEl} autoFocus />
                    <label>Password</label>
                    <input type="password" name="password" className={this.passwordValid() || this.state.passEmpty ? 'input--valid' : 'input--invalid'} onChange={this.handleSignupPasswordChange} ref={this.passwordEl} />
                    <label>Verify Password</label>
                    <input type="password" name="passwordVer" className={this.passwordValid() || this.state.passEmpty ? 'input--valid' : 'input--invalid'} onChange={this.handleSignupPasswordChange} ref={this.passwordVerEl} />
                    <label>Display Name</label>
                    <input type="text" name="displayName" ref={this.displayName} />
                    <div className="button-group">
                        <button className="button" onClick={this.signUpHandler}>Sign Up {this.state.loaderActive && <div className="donut" />}</button>
                    </div>
                </form>
                <div className="login-form__password-requirements">
                    <h3>Password must meet these requirements: </h3>
                    <ul>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passLength ? inputValid : inputInvalid}></img> Greater than six characters</li>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passUpper ? inputValid : inputInvalid}></img> At least one uppercase letter</li>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passLower ? inputValid : inputInvalid}></img> At least one lowercase letter</li>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passNum ? inputValid : inputInvalid}></img> At least one number</li>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passSpecial ? inputValid : inputInvalid}></img> At least one special character</li>
                        <li><img className="login-form__password-requirements__icon" src={this.state.passMatch ? inputValid : inputInvalid}></img> Passwords must match</li>
                    </ul>
                </div>
            </div>
        );
    }
}
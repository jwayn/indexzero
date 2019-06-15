import React, { Component } from 'react';

import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="login-form">
                <form>
                    <label>Email</label>
                    <input type="email" name="email" onChange={e=> this.change(e)} />
                    <label>Password</label>
                    <input type="password" name="password" onChange={e => this.change(e)} />
                </form>
                <button className="button login__button" onClick={this.login}>Sign Up</button>
                <button className="button login__button" onClick={this.signUp}>Login</button>
            </div>
        );
    }
}
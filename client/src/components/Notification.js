import React, { Component } from 'react';
import close from '../images/x-circle.svg';
import AuthContext from '../context/auth-context';

export default class Verify extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {};
    }
    
    close = () => {
        this.props.close(this.props.id);
    }

    sendEmail = async () => {
        console.log(this.context.token);
        await fetch('/api/auth/verify/resend-token', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.context.token
            }
        });
        this.close();
    }

    render() {
        return (
            <div className="notification">
                <div className="notification__close" onClick={this.close}>
                    <img src={close} alt="Close this notification"/>
                </div>
                <p>
                    {this.props.type === 'text' && this.props.text}
                    {this.props.type === 'verify' && 
                    <>
                        <span>Please verify your account before continuing. To resend the verification email, please </span>
                        <span className="fake-link" onClick={this.sendEmail}>click here.</span>
                    </>
                    }
                </p>
            </div>
        )
    }
};
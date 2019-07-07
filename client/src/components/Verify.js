import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import security from '../images/security.svg';

import './Verify.css';

export default class Verify extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            verified: false,
            verificationMessageDisplayed: false
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        const rawRes = await fetch('/api/auth/verify', {
            method: 'PUT',
            body: JSON.stringify({
                key: this.props.match.params.key
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resJson = await rawRes.json();
        if(rawRes.status === 200) {
            this.context.logout();
            this.context.login(resJson.token, resJson.userId, resJson.verified);
            this.setState({verified: true});
        } else if (rawRes.status === 403) {
            this.setState({verificationMessageDisplayed: true, verificationMessage: resJson.message});
        };
        this.setState({loading: false});
    }

    render() {
        return (
            <div className="verification-status">
                {this.state.verified &&
                    <div>
                        <h2>User verified!</h2>
                    </div>
                }
                {this.state.loading &&
                    <div>
                        <h2>Please wait while we verify your account.</h2>
                    </div>
                }
                {this.state.verificationMessageDisplayed &&
                    <div>
                        <h2>
                            {this.state.verificationMessage}
                        </h2>
                    </div>
                }
                <div>
                    <img src={security} alt="" />
                </div>
            </div>
        )
    }
};
import React, { Component } from 'react';

export default class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false
        }
    }

    async componentDidMount() {
        const options = {
            
        }
        const rawRes = await fetch('/api/auth/verify', {
            method: 'PUT',
            body: JSON.stringify({
                key: this.props.match.params.key
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(rawRes.status);
        if(rawRes.status === 200) {
            this.setState({verified: true})
        };
    }

    render() {
        return (
            <div>
                {this.state.verified && <p>User verified!</p>}
                {!this.state.verified && <p>Please wait while we verify your account.</p>}
            </div>
        )
    }
};
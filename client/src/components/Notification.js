import React, { Component } from 'react';
import close from '../images/x-circle.svg';

export default class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    
    close = () => {
        this.props.close(this.props.id);
    }

    render() {
        return (
            <div className="notification">
                <div className="notification__close" onClick={this.close}>
                    <img src={close} alt="Close this notification"/>
                </div>
                <p>
                    {this.props.text}
                </p>
            </div>
        )
    }
};
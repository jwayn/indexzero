import React, { Component } from 'react';
import warningIcon from '../images/warning.svg';
import closeButton from '../images/x-circle.svg';

import './Login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    closeInfo = () => {
        this.props.closeInfo();
    }

    render() {
        return (
            <div className="login-form__info">
                <div className="login-form__info__icon">
                    <img src={warningIcon} alt={this.props.text}></img>
                </div>
                <div className="login-form__info__content">
                    {this.props.text}
                </div>
                <div className="login-form__info__close">
                    <img src={closeButton} alt="close" onClick={this.closeInfo} />
                </div>
            </div>
        );
    }
}
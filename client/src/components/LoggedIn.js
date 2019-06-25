import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

import defaultIcon from '../images/user.svg';
import './LoggedIn.css';

export default class LoggedIn extends Component{

    constructor(props) {
        super(props)
        this.state = {}
    }

    logout = () => {

    }

    getIcon = (id) => {
        fetch(`/api/users/id=${id}`)
        .then(rawRes => {
            if (rawRes.status === 200) {
                return rawRes.json()
            }
        })
        .then(res => {
            if(res.avatarUrl !== null){
                this.setState({avatarUrl: res.avatarUrl});
            }
        })
    };

    showDropDownMenu = () => {
        this.setState({displayMenu: true});
        document.addEventListener('click', this.hideDropDownMenu);
    };

    hideDropDownMenu = () => {
        this.setState({displayMenu: false});
        document.removeEventListener('click', this.hideDropDownMenu);
    }

    render() {
        return (
            <AuthContext.Consumer>
            {context => {
                return(
                    <div className="logged-in">
                        <div className="logged-in__dropdown">
                            <span className="logged-in__dropdown__button" onClick={this.showDropDownMenu}>▼</span>
                            {this.state.displayMenu && 
                            <ul className="logged-in__dropdown__menu">
                                <li className="logged-in__dropdown__menu__item">Edit Profile</li>
                                <li className="logged-in__dropdown__menu__item" onClick={context.logout}>Logout</li>
                            </ul>
                            }
                            <img className="logged-in__dropdown__avatar" src={this.getIcon(context.userId) || defaultIcon}></img>
                        </div>
                    </div>
                )
            }}
        </AuthContext.Consumer>
        )
    }
}
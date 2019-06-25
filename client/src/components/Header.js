import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import brandIcon from '../images/brand.svg';
import AuthContext from '../context/auth-context';

import LoggedIn from './LoggedIn';

class Header extends Component{

    login() {
            
    }

    render() {
        return (
            <AuthContext.Consumer>
            {context => {
                return(
                    <div className="header-bar">
                        <Link to="/">
                            <div className="brand">
                                <img className="brand__logo" src={brandIcon} alt="Index 0"></img>
                                <span className="brand__text">Index[0]</span>
                            </div>
                        </Link>
                        <input className="input__text-box title-search" placeholder="Search"></input>
                        
                        {
                            !context.token && 
                            <div className="login-signup">
                                <Link className="button login__button" to="/login">Login / Sign Up</Link>
                            </div>
                        }
                        {
                            context.token && 
                            <LoggedIn />
                        }
                    </div>
                )
            }}
        </AuthContext.Consumer>
        )
    }
}


export default Header;
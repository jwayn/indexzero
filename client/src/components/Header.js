import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import brandIcon from '../images/brand.svg';
import AuthContext from '../context/auth-context';

class Header extends Component{

    login() {
            
    }

    render() {
        return (
            <AuthContext.Consumer>
            {context => {
                return(
                    <div className="header-bar">
                        <NavLink to="/">
                            <div className="brand">
                                <img className="brand__logo" src={brandIcon} alt="Index 0"></img>
                                <span className="brand__text">Index[0]</span>
                            </div>
                        </NavLink>
                        <input className="input__text-box title-search" placeholder="Search"></input>
                        
                        {
                            !context.token && 
                            <div className="login-signup">
                                <NavLink className="button login__button" to="/login">Login</NavLink>
                            </div>
                        }
                        {
                            context.token && 
                            <div>{context.userId} is logged in.</div>
                        }
                    </div>
                )
            }}
        </AuthContext.Consumer>
        )
    }
}


export default Header;
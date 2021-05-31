import { NavLink, Link, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext'
import axios from 'axios';
import { useHistory } from 'react-router';
import { apiAuth } from './../services/api/utilities/auth';

const Navbar = () => {

    const session = useContext(SessionContext)
    const history = useHistory()

    const logout = () => {
        console.log("Logout request fired");
        apiAuth.logout()
            .then(res => {
                console.log(res);
                session.setLoggedIn(false)
                history.replace({ pathname: "/auth", props: { isLoginPage: true } })
            })
    }

    const navbarEndItems = () => {
        if (session.isLoggedIn) {
            return (
                <div className="button is-danger" onClick={() => logout()}>
                    Logout <span className="ml-1"><i class="fas fa-sign-out-alt"></i></span>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                    <Link to={{ pathname: "/auth", props: { isLoginPage: false } }} className="button is-primary">Sign Up</Link>
                    <Link to={{ pathname: "/auth", props: { isLoginPage: true } }} className="button">Log In</Link>
                </React.Fragment>
            )
        }
    }

    return (
        <nav className="navbar mb-5 is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    Password Manager
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to={"/dashboard"} className="navbar-item" activeClassName="has-text-link has-background-info-light">Dashboard</NavLink>
                    <a className="navbar-item">
                        About
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {navbarEndItems()}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}


export default Navbar;
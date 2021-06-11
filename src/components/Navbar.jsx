import { NavLink, Link, Redirect } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext'
import axios from 'axios';
import { useHistory } from 'react-router';
import { apiAuth } from './../services/api/utilities/auth';
import { useLocation } from 'react-router-dom'

const Navbar = () => {

    const session = useContext(SessionContext);
    const history = useHistory();
    const location = useLocation();

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => { setHamburgerOpen((prevState) => { return !prevState }) }

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
                    Logout <span className="ml-1"><i className="fas fa-sign-out-alt"></i></span>
                </div>
            );
        }
        else if (location.pathname !== '/auth') {
            return (
                <React.Fragment>
                    <Link to={{ pathname: "/auth", props: { isLoginPage: false } }} className="button is-primary">Sign Up</Link>
                    <Link to={{ pathname: "/auth", props: { isLoginPage: true } }} className="button">Log In</Link>
                </React.Fragment>
            )
        }
    }

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink exact to={"/"} className="navbar-item" activeClassName="has-text-link has-background-info-light">
                    VAULT
                </NavLink>
                <a role="button"
                    className={`navbar-burger ${hamburgerOpen ? 'is-active' : null}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={toggleHamburger}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${hamburgerOpen ? 'is-active' : null}`}>
                <div className="navbar-start">
                    <NavLink to={"/dashboard"} className="navbar-item" activeClassName="has-text-link has-background-info-light">Dashboard</NavLink>
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
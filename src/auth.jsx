import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from './components/LoginForm';


const AuthPage = (props) => {

    const [loginPage, setLoginPage] = useState(props ? props : true);
    return (
        <div className="container is-fluid">
            <div className="columns is-desktop is-centered is-vcentered is-flex valign">
                <div className="column is-8">
                    <div className="card card-height">
                        <div className="card-content">
                            <div className="tabs is-fullwidth is-toggle is-toggle-rounded is-centered is-medium">
                                <ul>
                                    <li className={loginPage ? "is-active" : null} onClick = {() => setLoginPage(true)}>
                                        <a>
                                            <span class="icon is-small"><i class="fas fa-sign-in-alt"></i></span>
                                            <span>Login</span> 
                                        </a>
                                    </li>
                                    <li className={!loginPage ? "is-active" : null} onClick = {() => setLoginPage(false)}>
                                        <a>
                                            <span class="icon is-small"><i class="fas fa-user-plus"></i></span>
                                            <span>Register</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {loginPage ? <LoginForm/> : <RegistrationForm/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

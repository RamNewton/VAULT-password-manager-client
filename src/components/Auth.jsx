import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from './LoginForm';


const AuthPage = (props) => {
    const isLoginPage = props.location.props ? props.location.props.isLoginPage : true;
    const notificationMessage = props.location.props ? props.location.props.message : null;
    const notificationType = props.location.props ? props.location.props.type : null;
    const [loginPage, setLoginPage] = useState(isLoginPage);
    return (
        <div className="container is-fluid">
            <div className="columns is-desktop is-centered is-vcentered is-flex valign">
                <div className="column is-7">
                    <div className="card">
                        <div className="card-content card-height">
                            <div className="mx-5 tabs is-fullwidth is-toggle is-toggle-rounded is-centered is-medium">
                                <ul>
                                    <li className={loginPage ? "is-active" : null} onClick={() => setLoginPage(true)}>
                                        <a>
                                            <span className="icon is-small"><i className="fas fa-sign-in-alt"></i></span>
                                            <span>Login</span>
                                        </a>
                                    </li>
                                    <li className={!loginPage ? "is-active" : null} onClick={() => setLoginPage(false)}>
                                        <a>
                                            <span className="icon is-small"><i className="fas fa-user-plus"></i></span>
                                            <span>Register</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {loginPage ? <LoginForm notificationMessage={notificationMessage} notificationType={notificationType} /> : <RegistrationForm />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

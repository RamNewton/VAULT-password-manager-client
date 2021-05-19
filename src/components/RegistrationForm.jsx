import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {

    const [formData, setFormData] = useState({ "email": null, "password": null, "name": null });
    const [errorMessage, setErrorMessage] = useState(null)

    const formSubmit = () => {
        console.log("Post request fired")
        axios.post("http://localhost:5000/api/auth/register", formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                if (err.response)
                    setErrorMessage(err.response.data);
            });
    }

    const renderNotification = () => {
        if (errorMessage) {
            return (
                <div className="notification is-danger is-light">
                    <button className="delete" onClick={() => setErrorMessage(null)}></button>
                    {errorMessage}
                </div>
            )
        }
    }

    const requiredIcon = () => {
        return (
            <span className="icon" style={{
                fontSize: '8px',
                color: 'crimson'
            }}>
                <i className="fas fa-asterisk"></i>
            </span >
        )
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-8">
                {renderNotification()}
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Name" onChange={(evt) => { setFormData({ ...formData, "name": evt.target.value }) }} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" onChange={(evt) => { setFormData({ ...formData, "email": evt.target.value }) }} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {/* <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span> */}
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" onChange={(evt) => { setFormData({ ...formData, "password": evt.target.value }) }} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Repeat Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="mt-5 field is-flex is-justify-content-center">
                    <p className="control">
                        <button className="button is-medium is-success" onClick={() => formSubmit()}>
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm;
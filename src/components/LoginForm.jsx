import React from 'react';
import axios from "axios";
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import { SessionContext } from '../context/SessionContext';
import { useForm } from "react-hook-form";



const LoginForm = (props) => {

    const notificationMessage = props.notificationMessage
    const notificationType = props.notificationType
    const context = useContext(SessionContext)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        trigger,
        getValues,
        formState: { errors }
    } = useForm({
        'mode': 'onTouched',
        'defaultValues': { email: "", password: "" }
    });

    let history = useHistory();
    const formSubmit = (formData) => {
        setLoading(true);
        setErrorMessage(null);
        console.log("Post request fired")
        axios.post("http://localhost:5000/api/auth/", formData, { withCredentials: true })
            .then(res => {
                console.log(res);
                context.setLoggedIn(true);
                setLoading(false);
                history.replace("/dashboard");
            })
            .catch(err => {
                if (err.response)
                    setErrorMessage(err.response.data);
                setLoading(false);
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

    const renderAuthNotification = () => {
        if (notificationMessage) {
            return (
                <div className={`notification is-${notificationType} is-light is-text-center has-text-centered`}>
                    You need to be logged in to view that page.
                </div>
            )
        }
    }

    const emailErrorNotify = (errors) => {
        let message = null;

        if (errors?.email?.type === 'required') message = "This field is required";
        else if (errors?.email?.type === 'pattern') message = "Please enter a valid email id";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const passwordErrorNotify = (errors) => {
        let message = null;

        if (errors?.password?.type === 'required') message = "This field is required";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-8">
                {renderNotification()}
                {renderAuthNotification()}
                {/* <form onSubmit={handleSubmit(formSubmit)}> */}
                <div className="field">
                    {emailErrorNotify(errors)}
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" {...register("email", {
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                        })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    {passwordErrorNotify(errors)}
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password"
                            {...register("password", {
                                required: true,
                            })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="mt-5 field is-flex is-justify-content-center">
                    <p className="control">
                        <button className={`button is-medium ${loading ? 'is-loading' : null} is-success`}
                            onClick={async () => {
                                const valid = await trigger();
                                if (valid)
                                    formSubmit(getValues());
                            }
                            }>
                            Login
                            </button>
                    </p>
                </div>
                {/* </form> */}
            </div >
        </div >
    )
}

export default withRouter(LoginForm);
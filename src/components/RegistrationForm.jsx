import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { apiAuth } from './../services/api/utilities/auth';

const RegistrationForm = () => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const {
        register,
        trigger,
        getValues,
        formState: { errors }
    } = useForm({
        'mode': 'onTouched',
        'defaultValues': { name: "", email: "", password: "", repeat_password: "" }
    });

    const formSubmit = (formData) => {
        setLoading(true);
        setErrorMessage(null);
        console.log("Post request fired")
        let unwrap = (({ name, email, password }) => ({ name, email, password }))
        apiAuth.register(unwrap(formData))
            .then(res => {
                history.push('/dummy')
                history.replace({
                    pathname: "/auth", props: { isLoginPage: true, message: "Registered Successfully", type: "success" }
                    ,
                })
            })
            .catch(err => {
                if (err.response)
                    setErrorMessage(err.response.data);
                history.replace({ pathname: "/auth", props: { isLoginPage: false, message: "Error occured during registration", type: "danger" }, })
            })
            .finally(() => {
                setLoading(false);
            })
            ;
    }

    const emailErrorNotify = (errors) => {
        let message = null;

        if (errors?.email?.type === 'required') message = "This field is required";
        else if (errors?.email?.type === 'pattern') message = "Please enter a valid email id";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const nameErrorNotify = (errors) => {
        let message = null;

        if (errors?.name?.type === 'required') message = "This field is required";
        else if (errors?.name?.type === 'pattern') message = "Name should contain only letters and spaces";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const passwordErrorNotify = (errors) => {
        let message = null;

        if (errors?.password?.type === 'required') message = "This field is required";
        else if (errors?.password?.type === 'minLength') message = "Password should be minimum 6 characters long";
        else if (errors?.password?.type === 'maxLength') message = "Password should be maximum 18 characters long";
        else if (errors?.password?.type === 'pattern') message = "Password should contain atleast one number.";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const repeatPasswordErrorNotify = (errors) => {
        let message = null;

        if (errors?.repeat_password?.type === 'required') message = "This field is required";
        else if (errors?.repeat_password?.type === 'validate') message = "Repeat Password must match Password field";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
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
                    {nameErrorNotify(errors)}
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Name" {...register("name", {
                            required: true,
                            pattern: /[A-Za-z ]$/i
                        })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                </div>
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
                        {/* <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span> */}
                    </p>
                </div>
                <div className="field">
                    {passwordErrorNotify(errors)}
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 18,
                            pattern: /^(?=.*[0-9])([A-Za-z0-9!@#$%^&*().,<>_])+$/
                        })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    {repeatPasswordErrorNotify(errors)}
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Repeat Password" {...register("repeat_password", {
                            required: true,
                            validate: value => value === getValues('password')
                        })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-flex is-justify-content-center mt-5">
                    <p className="control">
                        <button className={`button is-medium ${loading ? 'is-loading' : null} is-success`}
                            onClick={async () => {
                                const valid = await trigger();
                                if (valid)
                                    formSubmit(getValues());
                            }
                            }>
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm;
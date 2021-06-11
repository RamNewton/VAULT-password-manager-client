import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { apiMain } from './../services/api/utilities/main';
import { SessionContext } from '../context/SessionContext';

const generateErrorMessage = (error) => {
    if (error.response.status === 401) {
        const errorMessage = error.response.data.message;
        var message = null;
        if (errorMessage === "Expired Token" || errorMessage === "No Token") {
            message = "Session expired. Please log in again."
        }
        else if (errorMessage === "Invalid Token") {
            message = "Error occured. Please log in again to continue."
        }
        return message;
    }
    return null;
}

const Form = ({ register, errors }) => {

    const accountNameErrorNotify = (errors) => {
        let message = null;

        if (errors?.accountName?.type === 'required') message = "This field is required";
        else if (errors?.accountName?.type === 'pattern') message = "Can contain only alphanumeric, underscore and space";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const usernameErrorNotify = (errors) => {
        let message = null;

        if (errors?.username?.type === 'required') message = "This field is required";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    const passwordErrorNotify = (errors) => {
        let message = null;

        if (errors?.password?.type === 'required') message = "This field is required";

        return message ? <p className="tag is-warning is-light mb-1">{message}</p> : null;
    }

    return (
        <div className="columns is-centered">
            <div className="column is-8">
                <div className="field">
                    {accountNameErrorNotify(errors)}
                    <p className="control">
                        <input className="input" type="text" placeholder="Account name"
                            {...register("accountName", {
                                required: true,
                                pattern: /^[A-Za-z_0-9 ]*$/i
                            })} />
                    </p>
                </div>
                <div className="field">
                    {usernameErrorNotify(errors)}
                    <p className="control">
                        <input className="input" type="text" placeholder="Username"
                            {...register("username", {
                                required: true
                            })} />
                    </p>
                </div>
                <div className="field">
                    {passwordErrorNotify(errors)}
                    <p className="control">
                        <input className="input" type="password" placeholder="Password"
                            {...register("password", {
                                required: true
                            })} />
                    </p>
                </div>
            </div>
        </div >
    );
}

const AddModal = (props) => {
    const history = useHistory();
    const context = useContext(SessionContext);
    const { visible, toggle, getItems } = props;
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const {
        register,
        trigger,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        'mode': 'onTouched',
        'defaultValues': { accountName: "", username: "", password: "" }
    });

    const formSubmit = (formData) => {
        console.log("Post request fired")
        setLoading(true);
        apiMain.createResource(formData)
            .then(res => {
                getItems();
                toggle();
                reset();
            })
            .catch(error => {
                const message = generateErrorMessage(error);
                if (message) {
                    context.setLoggedIn(false);
                    history.replace({
                        pathname: "/auth", props: { isLoginPage: true, message: message, type: "warning" }
                    })
                }
            })
            .finally(() => {
                setLoading(false);
            })
            ;
    }

    if (visible) {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New Entry</p>
                    </header>
                    <section className="modal-card-body">
                        <Form register={register} errors={errors}></Form>
                    </section>
                    <footer className="modal-card-foot is-flex is-justify-content-center">
                        <button className={`button is-success ${loading ? 'is-loading' : null}`}
                            onClick={async () => {
                                const valid = await trigger();
                                if (valid)
                                    formSubmit(getValues());
                            }}>
                            Add
                        </button>
                        <button className="button" onClick={() => { toggle(); reset(); }}>Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}

const AddCard = ({ getItems }) => {

    const [modalState, setModalState] = useState(false);
    const toggleState = () => {
        setModalState(prevState => !prevState);
    }

    return (
        <div>
            <AddModal visible={modalState} toggle={toggleState} getItems={getItems}></AddModal>
            <div className="card">
                <div className="card-content">
                    <p className="title">
                        Add Password
                </p>
                    <div className="is-flex is-justify-content-center mt-5">
                        <p className="subtitle">
                            <button className="button is-large is-success" onClick={toggleState}>
                                <span className="icon">
                                    <i className="fas fa-plus fa-2x"></i>
                                </span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UpdateModal = (props) => {
    const history = useHistory();
    const context = useContext(SessionContext);
    const { visible, toggle, getItems, id, accountName, username, password } = props;
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const {
        register,
        trigger,
        getValues,
        setValue,
        formState: { errors }
    } = useForm({
        'mode': 'onTouched',
        'defaultValues': { "accountName": accountName, "username": username, "password": password }
    });

    useEffect(() => {
        setValue('accountName', accountName);
        setValue('username', username);
        setValue('password', password);
    }, [visible])

    const formSubmit = (formData) => {
        setLoading(true);
        console.log("Post request fired")
        apiMain.updateResource(id, formData)
            .then(res => {
                getItems();
                toggle();
            })
            .catch(error => {
                const message = generateErrorMessage(error);
                if (message) {
                    context.setLoggedIn(false);
                    history.replace({
                        pathname: "/auth", props: { isLoginPage: true, message: message, type: "warning" }
                    })
                }
            })
            .finally(() => {
                setLoading(false);
            })
            ;
    }

    if (visible) {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Update Entry</p>
                    </header>
                    <section className="modal-card-body">
                        <Form register={register} errors={errors}></Form>
                    </section>
                    <footer className="modal-card-foot is-flex is-justify-content-center">
                        <button className={`button is-success ${loading ? 'is-loading' : null}`}
                            onClick={async () => {
                                const valid = await trigger();
                                if (valid)
                                    formSubmit(getValues());
                            }}>
                            Update
                        </button>
                        <button className="button" onClick={toggle} >Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }
    else
        return null;
}

const DeleteModal = ({ visible, toggle, getItems, id }) => {
    const history = useHistory();
    const context = useContext(SessionContext)
    const onConfirmation = () => {
        apiMain.deleteResource(id)
            .then(res => {
                getItems();
                toggle();
            })
            .catch(error => {
                const message = generateErrorMessage(error);
                if (message) {
                    context.setLoggedIn(false);
                    history.replace({
                        pathname: "/auth", props: { isLoginPage: true, message: message, type: "warning" }
                    })
                }
            });
    }

    if (visible) {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head has-text-centered">
                        <p className="modal-card-title">Are you sure you want to delete this entry?</p>
                    </header>
                    {/* <section className="modal-card-body is-flex is-justify-content-center">

                    </section> */}
                    <footer className="modal-card-foot is-flex is-justify-content-center">
                        <button className="button is-danger" onClick={() => onConfirmation()}>Delete</button>
                        <button className="button" onClick={toggle} >Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }
    else
        return null;
}

const Card = (props) => {
    const { accountName, username, password, getItems, id } = props
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);


    const togglePasswordVisible = () => { setPasswordVisible(prevState => !prevState) }
    const toggleDeleteModalVisible = () => { setDeleteModalVisible(prevState => !prevState) }
    const toggleUpdateModalVisible = () => { setUpdateModalVisible(prevState => !prevState) }

    return (
        <div>
            <DeleteModal visible={isDeleteModalVisible} toggle={toggleDeleteModalVisible} getItems={getItems} id={id}></DeleteModal>
            <UpdateModal
                visible={isUpdateModalVisible}
                toggle={toggleUpdateModalVisible}
                getItems={getItems}
                id={id}
                accountName={accountName}
                username={username}
                password={password}
            ></UpdateModal>
            <div className="card">
                <div className="card-content">
                    <p className="title">
                        {accountName}
                    </p>
                    <div className="mt-3 subtitle">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="username" readOnly value={username} />
                            </div>
                        </div>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type={isPasswordVisible ? "text" : "password"} value={password} placeholder="password" readOnly />
                            </div>
                            <div className="control">
                                <button className="button is-primary" onClick={() => togglePasswordVisible()}>
                                    <span className="icon">
                                        {
                                            isPasswordVisible ?
                                                <i className="far fa-eye-slash"></i> :
                                                <i className="far fa-eye"></i>
                                        }
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <button className=" card-footer-item button is-medium is-success" onClick={() => toggleUpdateModalVisible()}>
                        <i className="far fa-edit"></i>
                    </button>
                    <button className="card-footer-item button is-medium is-danger" onClick={() => toggleDeleteModalVisible()}>
                        <i className="far fa-trash-alt"></i>
                    </button>
                </footer>
            </div>
        </div>
    )
}

const Dashboard = () => {
    const history = useHistory();
    const context = useContext(SessionContext);
    const [items, setItems] = useState([]);
    const getItems = () => {
        apiMain.getAll()
            .then(res => {
                setItems(res);
            })
            .catch(error => {
                const message = generateErrorMessage(error);
                if (message) {
                    context.setLoggedIn(false);
                    history.replace({
                        pathname: "/auth", props: { isLoginPage: true, message: message, type: "warning" }
                    })
                }
            })
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className="container is-fluid">
            <div className="columns is-multiline">
                {
                    items.map((data) => {
                        return (
                            <div className="column is-4">
                                <Card accountName={data.accountName} username={data.username} password={data.password} id={data.id} getItems={getItems}></Card>
                            </div>
                        )
                    })
                }
                <div className="column is-4">
                    <AddCard getItems={getItems}></AddCard>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { SessionContext } from "../context/SessionContext";
import axios from 'axios';

const Form = ({ formData, setFormData }) => {

    return (
        <div className="columns is-centered">
            <div className="column is-8">
                <div className="field">
                    <p className="control">
                        <input className="input" type="text" placeholder="Account name" value={formData.account_name} onChange={(event) => { setFormData({ ...formData, "account_name": event.target.value }) }} />
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <input className="input" type="text" placeholder="Username" value={formData.username} onChange={(event) => { setFormData({ ...formData, "username": event.target.value }) }} />
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <input className="input" type="password" placeholder="Password" value={formData.password} onChange={(event) => { setFormData({ ...formData, "password": event.target.value }) }} />
                    </p>
                </div>
            </div>
        </div >
    );
}

const AddModal = (props) => {
    const { visible, toggle, getItems } = props;
    const [formData, setFormData] = useState({ "account_name": "", "username": "", "password": "" });

    const resetData = () => setFormData({ "account_name": "", "username": "", "password": "" });
    const formSubmit = () => {
        console.log("Post request fired")
        axios.post("http://localhost:5000/api/main/create", formData, { withCredentials: true })
            .then(res => {
                console.log(res);
                getItems();
                toggle();
                setFormData({ "account_name": "", "username": "", "password": "" });
            })
            .catch(err => {
                if (err.response)
                    console.error(err.response.data)
                // setErrorMessage(err.response.data);
            });
    }

    if (visible) {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New Entry</p>
                        <button className="delete" onClick={toggle} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <Form setFormData={setFormData} formData={formData}></Form>
                    </section>
                    <footer className="modal-card-foot is-flex is-justify-content-center">
                        <button className="button is-success" onClick={() => formSubmit()}>Add</button>
                        <button className="button" onClick={() => { toggle(); resetData(); }}>Cancel</button>
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
    const { visible, toggle, getItems, id, account_name, username, password } = props;
    const [formData, setFormData] = useState({ "account_name": account_name, "username": username, "password": password });

    const formSubmit = () => {
        console.log("Post request fired")
        axios.put(`http://localhost:5000/api/main/update/${id}`, formData, { withCredentials: true })
            .then(res => {
                console.log(res);
                getItems();
                toggle();
            })
            .catch(err => {
                if (err.response)
                    console.error(err.response.data)
                // setErrorMessage(err.response.data);
            });
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
                        <Form setFormData={setFormData} formData={formData}></Form>
                    </section>
                    <footer className="modal-card-foot is-flex is-justify-content-center">
                        <button className="button is-success" onClick={() => formSubmit()}>Update</button>
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
    console.log(id)
    const onConfirmation = () => {
        console.log("Delete request fired", id)
        console.log()
        axios.delete(`http://localhost:5000/api/main/delete/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res);
                getItems();
                toggle();
            })
            .catch(err => {
                if (err.response)
                    console.error(err.response.data)
                // setErrorMessage(err.response.data);
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
    const { account_name, username, password, getItems, id } = props
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
                account_name={account_name}
                username={username}
                password={password}
            ></UpdateModal>
            <div className="card">
                <div className="card-content">
                    <p className="title">
                        {account_name}
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

const Dashboard = (props) => {

    const context = useContext(SessionContext)
    let history = useHistory();
    const [items, setItems] = useState([]);

    const getItems = () => {
        axios.get("http://localhost:5000/api/main/", { withCredentials: true })
            .then(res => {
                console.log(res);
                setItems(res.data);
            })
            .catch(err => {
                console.log(err.response.data)
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
                                <Card account_name={data.account_name} username={data.username} password={data.password} id={data.id} getItems={getItems}></Card>
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
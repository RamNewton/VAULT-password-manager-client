import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from './context/SessionContext'
import { Route, Switch } from "react-router-dom";
import AuthPage from "./components/Auth.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from './components/UnprotectedRoute';
import { apiAuth } from './services/api/utilities/auth';
import PageLoadSpinner from './components/PageLoadSpinner';



const App = () => {

    const session = useContext(SessionContext);
    const [appLoading, setAppLoading] = useState(true);

    const checkLoginStatus = async () => {
        const status = await apiAuth.checkLoginStatus();
        try {
            if (status.logged_in)
                session.setLoggedIn(true);
            else
                session.setLoggedIn(false);
        }
        catch {
            console.log("Error in checking Login Status")
        }
        finally {
            setAppLoading(false);
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, [])


    return (
        appLoading
            ?
            <PageLoadSpinner></PageLoadSpinner>
            :
            <React.Fragment>
                <Navbar></Navbar>
                <Switch>
                    <UnprotectedRoute exact path="/auth" component={AuthPage}></UnprotectedRoute>
                    <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
                </Switch>
            </React.Fragment >
    )
}

export default App;
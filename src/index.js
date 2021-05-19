import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthPage from "./components/Auth.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar";
import { SessionContextProvider } from "./context/SessionContext";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SessionContextProvider>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/auth" component={AuthPage}></Route>
                    <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
                </Switch>
            </SessionContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

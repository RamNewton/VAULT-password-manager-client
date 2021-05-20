import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext'
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const session = useContext(SessionContext);
    return (
        <Route {...rest} render={
            props => {
                if (session.isLoggedIn) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/auth',
                            props: { isLoginPage: true, message: "You need to log in to view that page", type: "warning" },
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;
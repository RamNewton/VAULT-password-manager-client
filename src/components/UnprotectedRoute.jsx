import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext'
import { Route, Redirect } from 'react-router-dom';


const UnprotectedRoute = ({ component: Component, ...rest }) => {

    const session = useContext(SessionContext);
    return (
        <Route {...rest} render={
            props => {
                if (!session.isLoggedIn) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: 'dashboard',
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

export default UnprotectedRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    const authState = useSelector(state => state.authState);
    return (
        <Route
            {...rest}
            render={props => {
                if (authState) {
                    return <Component {...props.Children} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};



export default (ProtectedRoute);

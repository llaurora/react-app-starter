import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { getStoreUserInfo } from "./utils";

export default function AuthorizedLogin({ component: Component, ...rest }) {
    const userInfo = getStoreUserInfo();
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                userInfo ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}

import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getStoreUserInfo } from "./utils";

const AuthorizedLogin: FC<RouteProps> = ({ children, ...rest }) => {
    const userInfo = getStoreUserInfo();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userInfo ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default AuthorizedLogin;

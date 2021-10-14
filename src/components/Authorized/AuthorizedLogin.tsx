import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getStoreUserInfo } from "./utils";

const AuthorizedLogin: FC<RouteProps> = ({ component: PropertyComponent, ...rest }) => {
    const userInfo = getStoreUserInfo();
    return (
        <Route
            {...rest}
            render={(properties) =>
                userInfo ? (
                    <PropertyComponent {...properties} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: properties.location },
                        }}
                    />
                )
            }
        />
    );
};

export default AuthorizedLogin;

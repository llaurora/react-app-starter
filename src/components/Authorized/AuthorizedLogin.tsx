import { FC, ReactType } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { getStoreUserInfo } from "./utils";

interface AuthorizedLoginProperties {
    component: ReactType;
}

const AuthorizedLogin: FC<AuthorizedLoginProperties> = ({ component: PropertyComponent, ...rest }) => {
    const userInfo = getStoreUserInfo();
    return (
        <Route
            {...rest}
            render={(properties: RouteComponentProps) =>
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

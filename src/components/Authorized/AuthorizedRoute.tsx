import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { checkBatchAuthority } from "./utils";

interface AuthorizedRouteProperties extends RouteProps {
    authority: string[];
}

const AuthorizedRoute: FC<AuthorizedRouteProperties> = ({ authority, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(properties) =>
                checkBatchAuthority(authority) ? (
                    <Component {...properties} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/noauthorized",
                            state: { from: properties.location },
                        }}
                    />
                )
            }
        />
    );
};

export default AuthorizedRoute;

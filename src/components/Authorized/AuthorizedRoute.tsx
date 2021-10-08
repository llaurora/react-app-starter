import { FC, ReactType } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { checkBatchAuthority } from "./utils";

interface AuthorizedRouteProperties {
    component: ReactType;
    authority: string[];
    path: string;
    exact?: boolean;
}

const AuthorizedRoute: FC<AuthorizedRouteProperties> = ({ authority, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(properties: RouteComponentProps) =>
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

import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { checkBatchAuthority } from "./utils";

export default function AuthorizedRoute({ authority, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                checkBatchAuthority(authority) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/noauthorized",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}

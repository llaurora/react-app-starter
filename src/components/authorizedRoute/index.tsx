import { Navigate, useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { checkAuthority } from "@/auth";

interface AuthorizedRouteProps {
    authority: string | string[];
}

const AuthorizedRoute = ({ authority, children }: PropsWithChildren<AuthorizedRouteProps>) => {
    const location = useLocation();

    if (checkAuthority(authority)) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return <Navigate to="/noauthorized" state={{ from: location }} />;
};

export default AuthorizedRoute;

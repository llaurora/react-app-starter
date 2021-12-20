import { Navigate, useLocation } from "react-router-dom";
import { checkBatchAuthority } from "./utils";

const AuthorizedRoute = ({ authority, children }) => {
    const location = useLocation();

    if (checkBatchAuthority(authority)) {
        return children;
    }

    return <Navigate to="/noauthorized" state={{ from: location }} />;
};

export default AuthorizedRoute;

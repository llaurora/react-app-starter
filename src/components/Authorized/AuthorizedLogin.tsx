import { Navigate, useLocation } from "react-router-dom";
import { getStoreUserInfo } from "./utils";

const AuthorizedLogin = ({ children }) => {
    const userInfo = getStoreUserInfo();
    const location = useLocation();

    if (userInfo) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default AuthorizedLogin;

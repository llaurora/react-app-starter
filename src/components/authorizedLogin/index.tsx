import { Navigate, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { getSessionStorage, isNil } from "@/utils";
import { SESSION_KEY_USERINFO, LOGIN_URL } from "@/constants";
import { setAuthorities } from "@/auth";

interface AuthorizedLoginProps {
    children: (userInfo: API.UserInfo) => ReactElement;
}

const AuthorizedLogin = ({ children }: AuthorizedLoginProps) => {
    const location = useLocation();
    const sessionUserInfo: API.UserInfo = getSessionStorage(SESSION_KEY_USERINFO);

    if (!isNil(sessionUserInfo)) {
        setAuthorities(sessionUserInfo.authorities);
        return children(sessionUserInfo);
    }

    return <Navigate to={LOGIN_URL} state={{ from: location }} />;
};

export default AuthorizedLogin;

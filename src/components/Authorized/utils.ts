import { getStorage } from "@/utils";

interface UserInfo {
    authorities: string[];
    userName: string;
    userPwd: string;
}

export const USER_KEY = "userInfo";

export const getStoreUserInfo = (): UserInfo => getStorage(USER_KEY, "session");

export const checkAuthority = (code: string, force?: boolean): boolean => {
    if (code === undefined) {
        return true;
    }
    if (force ?? false) {
        return force;
    }
    const userInfo = getStoreUserInfo();
    return (userInfo?.authorities || []).includes(code);
};

export const checkBatchAuthority = (authorities: string[], force?: boolean): boolean => {
    if (authorities === undefined) {
        return true;
    }
    if (force ?? false) {
        return force;
    }
    return authorities.some((code: string) => checkAuthority(code));
};

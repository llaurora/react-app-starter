import { getStorage } from "@/utils";

export const getStoreUserInfo = () => getStorage("userInfo", "session");

export const checkAuthority = (code: string, force?: boolean) => {
    if (code === undefined) {
        return true;
    }
    if (force ?? false) {
        return force;
    }
    const userInfo = getStoreUserInfo();
    return (userInfo?.authorities || []).some((item: string) => item === code);
};

export const checkBatchAuthority = (authorities: string[], force?: boolean) => {
    if (authorities === undefined) {
        return true;
    }
    if (force ?? false) {
        return force;
    }
    return authorities.some((code: string) => checkAuthority(code));
};

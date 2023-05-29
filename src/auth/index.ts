let authorities: string[] = [];

/**
 * set authorities
 * @returns void
 * @param codes
 */
export const setAuthorities = (codes: string[]): void => {
    authorities = Array.isArray(codes) ? codes : [];
};

/**
 * get authorities
 * @returns string[]
 */
export const getAuthorities = (): string[] => {
    return authorities;
};

/**
 * remove authorities
 * @returns string[]
 */
export const removeAuthorities = (): void => {
    authorities = [];
};

/**
 * check authority
 * @returns boolean
 * @param code
 * @param force
 */
export const checkSingleAuthority = (code: string, force?: boolean): boolean => {
    if (code === undefined || force === true) {
        return true;
    }
    return authorities?.includes(code);
};

/**
 * check batch authority
 * @returns boolean
 * @param codes
 * @param force
 */
export const checkBatchAuthority = (codes: string[], force?: boolean): boolean => {
    if (!Array.isArray(codes) || force === true) {
        return true;
    }
    return codes.some((code: string) => checkSingleAuthority(code));
};

/**
 * check batch authority
 * @returns boolean
 * @param authority
 * @param force
 */
export const checkAuthority = (authority: string | string[], force?: boolean): boolean => {
    if (typeof authority === "string") {
        return checkSingleAuthority(authority, force);
    }
    if (Array.isArray(authority)) {
        return checkBatchAuthority(authority, force);
    }
    return true;
};

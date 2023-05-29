/**
 * throttle
 * @returns boolean
 * @param value
 */
export const isNil = (value: any): boolean => {
    return value === undefined || value === null;
};

/**
 * throttle
 * @returns Function
 * @param fn
 * @param wait
 */
export const throttle = <T = void>(fn: (...args) => T, wait: number): ((...args) => void) => {
    let timeroutId = null;
    return (...args) => {
        if (!timeroutId) {
            const start = Date.now();
            const tick = () => {
                const current = Date.now();
                if (current - start >= wait) {
                    fn.apply(this, args);
                    cancelAnimationFrame(timeroutId);
                    return;
                }
                timeroutId = requestAnimationFrame(tick);
            };
            timeroutId = requestAnimationFrame(tick);
        }
    };
};

/**
 * debounce
 * @returns void
 * @param fn
 * @param wait
 */
export const debounce = <T = void>(fn: (...args) => T, wait: number): ((...args) => void) => {
    let timeroutId;
    return (...args) => {
        if (timeroutId) {
            cancelAnimationFrame(timeroutId);
        }
        const start = Date.now();
        const tick = () => {
            const current = Date.now();
            if (current - start >= wait) {
                fn.apply(this, args);
                return;
            }
            timeroutId = requestAnimationFrame(tick);
        };
        timeroutId = requestAnimationFrame(tick);
    };
};

/**
 * set sessionStorage
 * @returns void
 * @param key
 * @param value
 */
export function setSessionStorage(key: string, value: any): void {
    let transSource: string;
    try {
        transSource = JSON.stringify(value);
    } catch {
        transSource = value;
    }
    sessionStorage.setItem(key, transSource);
}

/**
 * get sessionStorage
 * @returns void
 * @param key
 */
export function getSessionStorage(key: string): any {
    const getVal = sessionStorage.getItem(key);
    return (() => {
        let transTarget: string;
        try {
            transTarget = JSON.parse(getVal);
        } catch {
            transTarget = getVal;
        }
        return transTarget;
    })();
}

/**
 * remove sessionStorage
 * @returns void
 * @param key
 */
export function removeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
}

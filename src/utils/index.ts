/**
 * set storage(default localStorage)
 * @returns void
 * @param key
 * @param value
 * @param type
 */
export function setStorage(key: string, value: any, type: "session" | "local" = "local"): void {
    let transSource: string;
    try {
        transSource = JSON.stringify(value);
    } catch {
        transSource = value;
    }
    if (type === "local") {
        localStorage.setItem(key, transSource);
        return;
    }
    sessionStorage.setItem(key, transSource);
}

/**
 * get storage(default localStorage)
 * @returns void
 * @param key
 * @param type
 */
export function getStorage(key: string, type: "session" | "local" = "local"): any {
    const getValue = type === "local" ? localStorage.getItem(key) : sessionStorage.getItem(key);
    return (() => {
        let transTarget: string;
        try {
            transTarget = JSON.parse(getValue);
        } catch {
            transTarget = getValue;
        }
        return transTarget;
    })();
}

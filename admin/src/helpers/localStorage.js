export function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

export function setSessionStorage(key, value) {
    sessionStorage.setItem(key, value)
}

export function getStorage(key) {
    let val = localStorage.getItem(key)
    if (val === undefined || val === 'false' ) {
        return sessionStorage.getItem(key)
    }
    return val
}

function exists(key) {
    return localStorage.getItem(key) !== null ? true : false;
}

function getItem(key) {
    return JSON.parse(localStorage.getItem(key)); 
}

function saveItem(key,value) {
    return localStorage.setItem(key, JSON.stringify(value));
} 

function removeItem(key) {
    return localStorage.removeItem(key);
}

function removeAll() {
    return localStorage.clear();
}

const localStorageHelper = {
    exists,
    getItem,
    saveItem,
    removeItem,
    removeAll,
}

export default localStorageHelper;



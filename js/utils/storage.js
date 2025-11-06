export default class Storage {
    static get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return localStorage.getItem(key);
        }
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

/**
 * Store LocalStorage
 */

interface IStore {
    storage: Storage;
    set: (key: string, value: any) => void;
    get: (key: string) => any;
    remove: (key: string) => void;
    clear: () => void;
    removeList: (array: string[]) => void;
}

const store: IStore = {
    storage: window.localStorage,
    set(key: string, value: any) {
        if (!value) return;

        let data = serialize(value) || '';

        this.storage.setItem(key, data);
    },
    get(key: string) {
        if (!key) return;

        const val = this.storage.getItem(key);
        let newVal = val || '';

        try {
            newVal = JSON.parse(newVal);
        } catch (err) {
            newVal = val || '';
        }

        return newVal;
    },
    remove(key: string) {
        if (!key) return;

        this.storage.removeItem(key);
    },
    clear() {
        this.storage.clear();
    },
    // 批量删除 array => key 数组
    removeList(array: string[]) {
        for (let key of array) {
            this.storage.removeItem(key);
        }
    }
};

const serialize = function(value: any) {
    if (!value) return;

    let val = '';
    const type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        val = JSON.stringify(value);
    } else {
        val = value;
    }

    return val;
};

export default store;

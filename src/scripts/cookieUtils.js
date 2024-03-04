export default {
    getCookie: (name) => {
        let serialized = localStorage[name];
        if (serialized.length === 0) return {};
        return JSON.parse(serialized);
    },
    setCookie: (name, value) => {
        let serialized = JSON.stringify(value);
        localStorage[name] = serialized;
    }
};
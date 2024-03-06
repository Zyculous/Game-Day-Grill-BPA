export default {
    getCookie: (name) => {
        let serialized = localStorage[name];
        console.log(serialized);
        if (serialized === undefined) return {};
        return JSON.parse(serialized);
    },
    setCookie: (name, value) => {
        let serialized = JSON.stringify(value);
        localStorage[name] = serialized;
    }
};
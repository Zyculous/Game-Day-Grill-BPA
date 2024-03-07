function validateObject(obj, validation={}) {
    let defaultValue = validation['default'];

    if (defaultValue === undefined) defaultValue = null;

    switch (validation['type']) {
        case "array":
            if (!Array.isArray(obj)) obj = defaultValue || [];

            if (validation['item_validation'] !== undefined) {
                for (let i = 0; i < obj.length; i++) {
                    obj[i] = validateObject(obj[i], validation['item_validation']);
                }
            }
            break;
        case "number":
            if (typeof(obj) !== 'number') obj = defaultValue || 0;
            break;
        case "object":
            if (typeof(obj) !== 'object') obj = defaultValue || {};

            if (validation['params'] !== undefined) {
                for (let paramName in validation['params']) {
                    if (paramName === undefined) continue;

                    obj[paramName] = validateObject(obj[paramName], validation['params'][paramName]);
                }
            }
            break;
    }

    return obj;
}

function getCookie(name, validation={}) {
    let serialized = localStorage[name];

    let json;
    try {
        json = JSON.parse(serialized);
    } catch {
        json = {};
    }

    json = validateObject(json,validation);

    return json;
}

function setCookie(name, value) {
    let serialized = JSON.stringify(value);
    localStorage[name] = serialized; 
}

export default {
    validateObject: validateObject,
    getCookie: getCookie,
    setCookie: setCookie
};
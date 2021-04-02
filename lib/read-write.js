const fs = require('fs');

const readFileJson = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data.toString()));
        });
    });
}

const printKeysObject = (obj) => {
    return Object.keys(obj).join(', ');
}

module.exports = {
    readFileJson,
    printKeysObject,
};
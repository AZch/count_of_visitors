const tokenName = 'token';

function setToken(token) {
    localStorage.setItem(tokenName, token);
}

function getToken() {
    return localStorage.getItem(tokenName);
}

function deleteToken() {
    localStorage.setItem(tokenName, "");
}

function isExist() {
    return localStorage.getItem(tokenName) !== undefined &&
        localStorage.getItem(tokenName) !== null &&
        localStorage.getItem(tokenName) !== "";
}

module.exports.setToken = setToken;
module.exports.getToken = getToken;
module.exports.deltetToken = deleteToken;
module.exports.isExist = isExist;
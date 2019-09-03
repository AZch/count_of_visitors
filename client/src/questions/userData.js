const token = 'token';
const email = 'email';
const login = 'login';

function setUserData(user) {
    return {
        email: localStorage.setItem(email, user.email),
        token: localStorage.setItem(token, user.token),
        login: localStorage.setItem(login, user.login),
    }
}

function getToken() {
    return localStorage.getItem(token);
}

function getUserData() {
    return {
        email: localStorage.getItem(email),
        token: localStorage.getItem(token),
        login: localStorage.getItem(login),
    }

}

function deleteUser() {
    localStorage.setItem(email, "");
    localStorage.setItem(token, "");
    localStorage.setItem(login, "");
}

function isExistField(field) {
    return localStorage.getItem(field) !== undefined &&
        localStorage.getItem(field) !== null &&
        localStorage.getItem(field) !== "";
}

function isExist() {
    return isExistField(email) && isExistField(token) && isExistField(login)
}

module.exports.setUserData = setUserData;
module.exports.getToken = getToken;
module.exports.deleteUser = deleteUser;
module.exports.isExist = isExist;
module.exports.getUserData = getUserData;
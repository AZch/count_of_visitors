
const axios = require('axios');
const API_URL = 'https://localhost:8000';
const UserData = require('./userData');

async function login(data = {}, isCreate = false) {
    let res = {};
    if (isCreate) {
        res = await  axios.post(`${API_URL}/user/create`, data);
        data = res.data;
    }
    res = await axios.post(`${API_URL}/user/login`, data);
    UserData.setUserData(res.data);
    return res.data;
}

async function editUser(data = {}) {
    let config = {};
    if (UserData.isExist()) {
        config = {headers: {'Authorization': `Bearer ${UserData.getToken()}`} }
    }
    let res = await axios.put(`${API_URL}/user/`, data, config);
    console.log(res);
    return await login(res.data);
}

async function getConnections(url = "", numPage=0) {
    let config = {};
    if (UserData.isExist()) {
        config = {headers: {'Authorization': `Bearer ${UserData.getToken()}`} }
    }
    const result = await axios.get(`${API_URL}${url}/?page=${numPage}`, config);
    return result.data;
}

module.exports.login = login;
module.exports.getConnections = getConnections;
module.exports.editUser = editUser;
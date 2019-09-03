
const axios = require('axios');
const API_URL = 'https://localhost:8000';
const UserData = require('./userData');

async function login(data = {}, isCreate) {
    let res = {};
    if (isCreate) {
        res = await  axios.post(`${API_URL}/user/create`, data);
        data = res.data;
    }
    res = await axios.post(`${API_URL}/user/login`, data);
    console.log(res.data);
    UserData.setUserData(res.data);
    console.log(UserData.getUserData());
    return res.data;
}

async function getConnections(url = "", numPage) {
    let config = {};
    if (UserData.isExist()) {
        config = {headers: {'Authorization': `Bearer ${UserData.getToken()}`} }
    }
    const result = await axios.get(`${API_URL}${url}/?page=${numPage}`, config);
    return result.data;
}

module.exports.login = login;
module.exports.getConnections = getConnections;
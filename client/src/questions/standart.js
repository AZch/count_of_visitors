
const axios = require('axios');
const API_URL = 'https://localhost:8000';
const Token = require('../questions/token');

async function login(data = {}, isCreate) {
    let res = {};
    if (isCreate) {
        res = await  axios.post(`${API_URL}/user/create`, data)
    } else {
        res = await axios.post(`${API_URL}/user/login`, data);
    }
    Token.setToken(res.data.token);
    return res.data;
}

async function getConnections(url = "", numPage) {
    let config = {};
    if (Token.isExist()) {
        config = {headers: {'Authorization': `Bearer ${Token.getToken()}`} }
    }
    const result = await axios.get(`${API_URL}${url}/?page=${numPage}`, config);
    return result.data;
}

module.exports.login = login;
module.exports.getConnections = getConnections;
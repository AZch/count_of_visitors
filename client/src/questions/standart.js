
const axios = require('axios');
const API_URL = 'https://localhost:8000';
const Token = require('../questions/token');

async function login(data = {}) {
    let res = await axios.post(`${API_URL}/user/login`,data);
    console.log(res.data);
    Token.setToken(res.data.token);
    return res.data;
}

async function getConnections(url = "", numPage) {
    console.log(Token.getToken());
    let result = await axios.get(`${API_URL}${url}/?page=${numPage}`, {headers: {'Authorization': `Bearer ${Token.getToken()}`} });
    console.log(result);
    return result.data;
}

module.exports.login = login;
module.exports.getConnections = getConnections;
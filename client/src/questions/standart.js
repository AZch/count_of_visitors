
const axios = require('axios');
const API_URL = 'https://localhost:8000';

async function postData(url = '', data = {}) {
    let res = await axios.post(`${API_URL}/user/login`,data);
    console.log(res);
    return res;
}

async function getData(numPage) {
    let result = await axios.get(`${API_URL}/?page=${numPage}`);
    return result.data;
}

module.exports.postData = postData;
module.exports.getData = getData;
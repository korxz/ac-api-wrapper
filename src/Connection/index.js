const config = require('../config/dev.config');
const axios = require('axios');

const instance = axios.create({
    baseURL: config.base_url,
    timeout: 10000,
    headers: {
        'Api-Token': config.api_token,
        'Accept': 'application/json'
    }
});

module.exports = instance;
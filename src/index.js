// Create new Axios client
/**
 * base_uri: config.base_uri,
 * headers: {
 *     User-Agent: 'activecampaign-v3-php/1.0',
 *     Api-Token: config.api_token,
 *     Accept: 'application/json'
 * }
 */

const Contact = require('./Contact/contact');
const Deal = require('./Deal/deal');

module.exports = {
    Contact,
    Deal
};
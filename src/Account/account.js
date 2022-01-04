const instance = require('../Connection');
const uri = '/api/3/accounts';
const ActiveCampaignError = require('../utils/ActiveCampaignError');

/**
 * Create new Account
 * 
 * @param {json} data
 * 
 * @return {json}
 */
const create = async(data) => {
    try {
        const response = await instance.post(uri, {
            'account': data
        });

        if (response.data && response.status === 201) {
            return response.data.account;
        }
    } catch (err) {
/*         if (err.response.status === 422) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Update and Account by id
 * 
 * @param {integer} id
 * @param {json} data 
 * 
 * @return {json}
 */
const update = async(id, data) => {
    try {
        const response = await instance.put(uri + '/' + id, {
            'account': data
        });

        if (response.data && response.status === 200) {
            return response.data.account;
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get an Account by id
 * 
 * @param {integer} id 
 * 
 * @return {json}
 */
const findById = async(id) => {
    try {
        const response = await instance.get(uri + '/' + id)

        if (response.data && response.status === 200) {
            return response.data.account;
        }
    } catch (err) {
/*         if (err.response.status === 404) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get an Account by name
 * 
 * @param {string} name 
 * 
 * @return {json}
 */
const findByAccountName = async(name) => {
    try {
        const response = await instance.get(uri + '?search=' + name);

        if (response.data && response.status === 200) {
            return response.data.accounts[0];
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get all Accounts
 * 
 * @return {json}
 */
const findAll = async() => {
    try {
        const response = await instance.get(uri);

        if (response.data && response.status === 200) {
            return response.data.accounts;
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Delete an Account by id
 * 
 * @param {integer} id 
 * 
 * @return {string}
 */
const destroy = async(id) => {
    try {
        const response = await instance.delete(uri + '/' + id);

        if (response.data && response.status === 200) {
            return {
                'message': 'Account was successfully deleted.'
            };
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Connect Contact with an Account
 * 
 * @param {integer} contactId 
 * @param {integer} accountId 
 * @param {string} jobTitle
 * 
 * @param {json}
 */
const addContactToAccount = async(contactId, accountId, jobTitle = '') => {
    try {
        const response = await instance.post(uri, {
            'accountContact': {
                'contact': contactId,
                'account': accountId,
                'jobTitle': jobTitle
            }
        });

        if (response.data && response.status === 201) {
            return response.data.accountContact;
        }
    } catch (err) {
/*         if (err.response.status === 422) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

module.exports = {
    create,
    update,
    findById,
    findByAccountName,
    findAll,
    destroy,
    addContactToAccount
}
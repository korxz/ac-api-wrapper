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
 * @param {object}
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

/**
 * Create new Account custom field
 * 
 * @param {string} fieldLabel 
 * @param {string} fieldType 
 * 
 * @returns {object}
 */
const createCustomFiled = async(fieldLabel, fieldType) => {
    const allowedFieldTypes = ["text", "textarea", "date", "datetime", "dropdown", "multiselect", "radio", "checkbox", "hidden", "currency", "number"];
    if (!fieldLabel || !fieldType || !allowedFieldTypes.includes(fieldType)) {
        throw new ActiveCampaignError('Account create custom field value error. Validation of required field failed.');
    }

    try {
        const response = await instance.post('/api/3/accountCustomFieldMeta', {
            'accountCustomFieldMetum': {
                'fieldLabel': fieldLabel,
                'fieldType': fieldType
            }
        });

        if (response && response.status === 200) {
            return response.data.accountCustomFieldMetum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get Account custom field by id
 * @param {integer} id 
 * 
 * @returns {object}
 */
const getCustomField = async(id) => {
    if (typeof id != 'number') {
        throw new ActiveCampaignError('Account get custom field validation failed. Id is not a number');
    }
    try {
        const response = await instance.get('/api/3/accountCustomFieldMeta/' + id);

        if (response && response.status === 200) {
            return response.data.accountCustomFieldMetum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);        
    }
}

/**
 * Get all Account custom fields
 * @returns {object}
 */
const getAllCustomFields = async() => {
    try {
        const response = await instance.get('/api/3/accountCustomFieldMeta');

        if (response && response.status === 200) {
            return response.data.accountCustomFieldMeta;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);        
    }
}

/**
 * Delete custom field by id
 * 
 * @param {integer} id 
 * 
 * @returns {object}
 */
const destoryCustomFieldById = async(id) => {
    if (typeof id != 'number') {
        throw new ActiveCampaignError('Account delete custom field validation failed. Id is not a number');
    }

    try {
        const response = await instance.delete('/api/3/accountCustomFieldMeta/' + id);

        if (response && response.status === 200) {
            return response.data.message;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);        
    }
}

/**
 * Set account custom field value
 * 
 * @param {integer} accountId 
 * @param {integer} customFieldId 
 * @param {string} value 
 * 
 * @returns {object}
 */
const setCustomFieldValue = async(accountId, customFieldId, value) => {
    if (!accountId || !customFieldId || !value) {
        throw new ActiveCampaignError('Account set custom field value error. Validation of required field failed.');
    }

    try {
        const response = await instance.post('/api/3/accountCustomFieldData', {
            'accountCustomFieldDatum': {
                'accountId': accountId,
                'customFieldId': customFieldId,
                'value': value
            }
        });

        if (response && response.status === 200) {
            return response.data.accountCustomFieldDatum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Create Account custom field values in bulk
 * @param {integer} accountId 
 * @param {array} data 
 * 
 * @returns {object}
 */
 const createBulkCustomFieldValues = async(accountId, data) => {
    try {
        let postData = [];

        data.forEach(item => {
            if (item.customFieldId && item.fieldValue) {
                postData.push( { customerAccountId: accountId, ...item } )
            }
        });

        const response = await instance.post('/api/3/accountCustomFieldData/bulkCreate', postData);

        if (response && response.status === 200) {
            return response.data.message;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Get account custom field value by id
 * 
 * @param {integer} id 
 * 
 * @returns {object}
 */
const getCustomFieldValueById = async(id) => {
    if (!id) {
        throw new ActiveCampaignError('Account get custom field value error. Validation of required field failed.');
    }

    try {
        const response = await instance.get('/api/3/accountCustomFieldData/' + id);

        if (response && response.status === 200) {
            return response.data.accountCustomFieldDatum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get all Account custom field values
 * 
 * @returns {object}
 */
const getAllCustomFieldvalues = async() => {
    try {
        const response = await instance.get('/api/3/accountCustomFieldData');

        if (response && response.status === 200) {
            return response.data.accountCustomFieldData;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

module.exports = {
    create,
    update,
    findById,
    findByAccountName,
    findAll,
    destroy,
    addContactToAccount,
    createCustomFiled,
    setCustomFieldValue,
    getCustomFieldValueById,
    getAllCustomFieldvalues,
    createBulkCustomFieldValues,
    getCustomField,
    getAllCustomFields,
    destoryCustomFieldById
}
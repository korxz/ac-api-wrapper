const instance = require('../Connection');
const uri = '/api/3/contacts';
const ActiveCampaignError = require('../utils/ActiveCampaignError');

/**
 * Create new Conctact
 * 
 * @param {array} data
 * @return object
 */
const create = async(data) => {
    try {
        const response = await instance.post(uri, {
            'contact': data
        });

        if (response.data && response.status === 201) {
            return response.data.contact;
        }
    } catch (err) {
/*         if (err.response.status === 404 || err.response.status === 422) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Create or update Contact
 * 
 * @param {array} data
 * @return object
 */
const sync = async(data) => {
    try {

    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get a contact by id
 * 
 * @param {integer} id 
 * @return object
 */
const findById = async(id) => {
    try {
        const response = await instance.get(uri + '/' + id);

        if (response.data && response.status === 200) {
            return response.data.contact
        }
    } catch (err) {
/*         if (err.response.status === 404) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Find a Contact by query string
 * 
 * @param {string} email
 * @return object
 */
const findByEmail = async(email) => {
    try {
        const response = await instance.get(uri + '?email=' + email);

        return response.data.contact[0];
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Find all Contacts
 * 
 * @return object
 */
const findAll = async() => {
    try {
        const response = await instance.get(uri);

        return response.data.contacts;
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Update a contact by id
 * 
 * @param {integer} id 
 * @param {array} data 
 * @return object
 */
const update = async(id, data) => {
    try {
        const response = await instance.post(uri + '/' + id, data);

        return response.data.contact;
    } catch (err) {
/*         if (err.response.status === 404) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Delete a contact by id
 * 
 * @param {integer} id 
 * @return object
 */
const destory = async(id) => {
    try {
        const response = await instance.delete(uri + '/' + id);

        if (response && response.status === 200) {
            return {
                'message': 'Contact was successfully deleted.'
            };
        }
    } catch (err) {
/*         if (err.response.status === 404) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
}
/**
 * Create new custom field for Contact model
 * 
 * @param {array} data 
 * @returns object
 */
const createCustomField = async(data) => {
    try {
        const allowedCustomFieldType = ['dropdown', 'hidden', 'checkbox', 'date', 'text', 'datetime', 'textarea', 'NULL', 'listbox', 'radio'];

        // Check if required fields are passed
        if (!data.type || !data.title) {
            throw new ActiveCampaignError('Create custom field for contact failed. Required fields are not set.');
        }

        if (!allowedCustomFieldType.includes(data.type)) {
            throw new ActiveCampaignError('Create custom field for contact failed. Type property is not allowed type');
        }

        const response = await instance.post('/api/3/fields', {
            'field': {
                'type': data.type,
                'title': data.title,
                'description': data.description ?? '',
                'visible': data.visible ?? 1,
                'defval': data.defval ?? ''
            }
        });

        if (response && response.status === 201) {
            return response.data
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Set new value for Contact custom field
 * @param {integer} contactId 
 * @param {integer} fieldId 
 * @param {string} value 
 * @returns object
 */
const setCustomFieldValue = async(contactId, fieldId, value) => {
    try {
        const response = await instance.post('/api/3/fieldValues', {
            'fieldValue': {
                'contact': contactId,
                'field': fieldId,
                'value': value
            }
        });

        if (response && response.status === 200) {
            return response.data.contacts[0];
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Get Contact custom field value by id
 * 
 * @param {integer} fieldValueId 
 * @returns object
 */
const getCustomFieldValue = async(fieldValueId) => {
    try {
        const response = await instance.get('/api/3/fieldValues/' + fieldValueId);

        if (response && response.status === 200) {
            return response.data.fieldValue;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

module.exports = {
    create,
    sync,
    findById,
    findByEmail,
    findAll,
    destory,
    update,
    createCustomField,
    getCustomFieldValue,
    setCustomFieldValue
};
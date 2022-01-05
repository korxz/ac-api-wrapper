const instance = require('../Connection');
const ActiveCampaignError = require('../utils/ActiveCampaignError');
const uri = '/api/3/deals';

/**
 * Create a new Deal
 * 
 * @param {json} data 
 * @return {json}
 */
const create = async(data) => {
    try {
        const response = await instance.post(uri, {
            deal: data
        });

        if (response.data.deal && response.status === 201) {
            return response.data.deal
        }
    } catch (err) {
        /*
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
        */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Update a deal by id
 * 
 * @param {integer} id 
 * @param {json} data 
 * @return {json}
 */
const update = async(id, data) => {
    try {
        const response = await instance.put(uri + '/' + id, {
            deal: data
        });

        if (response.data.deal && response.status === 200) {
            return response.data.deal
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get deal by id
 * 
 * @param {integer} id 
 * @return {json}
 */
const findById = async(id) => {
    try {
        const response = await instance.get(uri + '/' + id);

        if (response.data.deal && response.status === 200) {
            return response.data.deal;
        }
    } catch (err) {
        //return err.response.data.errors;
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get deal by title
 * 
 * @param {string} title 
 * @return {json}
 */
const findByTitle = async(title) => {
    try {
        const response = await instance.get(uri, {
            'filters[title]': title
        });

        if (response.data.deal && response.status === 200) {
            return response.data.deals
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Get all deals
 * 
 * @return {json}
 */
const findAll = async() => {
    try {
        const response = await instance.get(uri);

        if (response.data.deals && response.status === 200) {
            return response.data.deals
        }
    } catch (err) {
/*         if (err.response.status === 400) {
            return err.response.data.errors;
        } */
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Delete deal by id
 * 
 * @param {integer} id 
 * @return {string}
 */
const destory = async(id) => {
    try {
        const response = await instance.delete(uri + '/' + id);

        if (response.data.deals && response.status === 200) {
            return {
                message: 'Deal was successfully deleted.'
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
 * Add a note to the Deal by id
 * 
 * @param {integer} id 
 * @param {string} note 
 * @return {json}
 */
const addNote = async(id, note) => {
    try {
        const response = await instance.post(uri + '/' + id + '/notes', {
            note: note
        });

        if (response.data.deals && response.status === 201) {
            return response.data.deals;
        }
    } catch (err) {
        //return err.response.data.errors;
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Update deal note by noteId
 * 
 * @param {integer} id 
 * @param {integer} noteId 
 * @param {string} note 
 * @return {json}
 */
const updateNote = async(id, noteId, note) => {
    try {
        const response = await instance.post(uri + '/' + id + '/notes/' + noteId, {
            note: note
        });

        if (response.data.deals && response.status === 200) {
            return response.data.deals;
        }
    } catch (err) {
        //return err.response.data.errors;
        throw new ActiveCampaignError(err.response.data.errors);
    }
};

/**
 * Create new custom field for deal
 * 
 * @param {string} fieldLabel 
 * @param {string} fieldType 
 * 
 * @return {object}
 */
const createCustomFiled = async(fieldLabel, fieldType) => {
    const allowedFieldTypes = ["text", "textarea", "date", "datetime", "dropdown", "multiselect", "radio", "checkbox", "hidden", "currency", "number"];

    if (!allowedFieldTypes.includes(fieldType) || !fieldLabel) {
        throw new ActiveCampaignError('Deal create custom field failed. Validation of required fields failed.');
    }

    try {
        const response = await instance.post('/api/3/dealCustomFieldMeta', {
            "dealCustomFieldMetum": {
                "fieldLabel": fieldLabel,
                "fieldType": fieldType,
            }
        });

        if (response && response.status === 200) {
            return response.data.dealCustomFieldMetum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Set deal custom field value
 * 
 * @param {integer} dealId 
 * @param {integer} customFieldId 
 * @param {string} value 
 * 
 * @return {object}
 */
const setCustomFieldValue = async(dealId, customFieldId, value) => {
    if (!dealId || !customFieldId || !value) {
        throw new ActiveCampaignError('Deal set custom field value error. Validation of required field failed.');
    }

    try {
        const response = await instance.post('/api/3/dealCustomFieldData', {
            "dealCustomFieldData": {
                "dealId": dealId,
                "customFieldId": customFieldId,
                "value": value
            }
        });

        if (response && response.status === 200) {
            return response.data.dealCustomFieldData;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

/**
 * Get deal custom field value by id
 * 
 * @param {integer} id 
 * 
 * @returns {object}
 */
const getCustomFieldValue = async(id) => {
    if (!id) {
        throw new ActiveCampaignError('Deal get custom field value error. Validation of required field failed.');
    }

    try {
        const response = await instance.get('/api/3/dealCustomFieldData/' + id);

        if (response && response.status === 200) {
            return response.data.dealCustomFieldDatum;
        }
    } catch (err) {
        throw new ActiveCampaignError(err.response.data.errors);
    }
}

module.exports = {
    create,
    update,
    findById,
    findByTitle,
    findAll,
    destory,
    addNote,
    updateNote,
    createCustomFiled,
    setCustomFieldValue,
    getCustomFieldValue
};
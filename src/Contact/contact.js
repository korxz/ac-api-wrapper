const instance = require('../Connection');
const uri = '/api/3/contacts/';
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
        if (err.response.status === 404 || err.response.status === 422) {
            return err.response.data.errors;
        }
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
        const response = await instance.get(uri + id);

        if (response.data && response.status === 200) {
            return response.data
        }
    } catch (err) {
        if (err.response.status === 404) {
            return err.response.data.errors;
        }
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

        return response.data;
    } catch (err) {
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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

        return response.data;
    } catch (err) {
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        const response = await instance.post(uri + id, data);

        return response.data;
    } catch (err) {
        if (err.response.status === 404) {
            return err.response.data.errors;
        }
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
        const response = await instance.delete(uri + id);

        return 'Contact was successfully deleted.';
    } catch (err) {
        if (err.response.status === 404) {
            return err.response.data.errors;
        }
    }
}

module.exports = {
    create,
    sync,
    findById,
    findByEmail,
    findAll,
    destory,
    update
};
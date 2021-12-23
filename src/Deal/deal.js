const instance = require('../Connection');
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
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        return err.response.data.errors;
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
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        if (err.response.status === 400) {
            return err.response.data.errors;
        }
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
        return err.response.data.errors;
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
        return err.response.data.errors;
    }
};

module.exports = {
    create,
    update,
    findById,
    findByTitle,
    findAll,
    destory,
    addNote,
    updateNote
};
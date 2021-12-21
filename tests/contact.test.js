const { Contact } = require('../src/index');

// Test Contact Create

const testContactCreate = async() => {
    const response = await Contact.create({
        'email': 'janedddddsz.novak@test.si',
        'firstName': 'Janeu',
        'lastName': 'Novak'
    });

    console.log(response);

}

testContactCreate();

// Test Contact Update

// Test Contact Delete
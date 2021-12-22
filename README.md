# ac-api-wrapper
NodeJS wrapper for ActiveCampaign API

Javascript wrapper for ActiveCampaign API v3.

**Create new Contact example:**
```js
const { Contact } = require('ac-api-wrapper');

const contactData = {
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '555 555 555'
}

async() => {

    const newContact = await Contact.create(contactData);

}();
```

**Create new Account example:**
```js
const {Account} = require('ac-api-wrapper');

const accountData = {
    name: 'Example Account',
    accountUrl: 'https://www.example.com',
}

async() => {
    
    const newAccount = await Account.create(accountData);

}();
```

## Services

### Account
### Contact

| Methods  |
| ------------- |
| create      |
| sync      |
| update      |
| findById |
| findByEmail |
| findAll |
| destroy |

### Deal

### List


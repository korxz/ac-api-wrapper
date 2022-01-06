# ac-api-wrapper

Javascript wrapper for ActiveCampaign API v3.
This lib was made for easir use of ActiveCampaign with Javascript. Lib covers the main ActiveCampaign functions such as: Accounts, Customers, Deals and Lists.
Wrapper method will return a result or throw and ActiveCampaignError exception

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

**Create new Deal example:**
```js
const {Deal} = require('ac-api-wrapper');

const dealData = {
    contact: 1,
    account: 1,
    title: 'New deal',
    value: 100
}

async() => {

    const newDeal = await Deal.create(dealData);
    
}();
```

## Services

### Account
| Methods  |
| ------------- |
| create      |
| update      |
| update      |
| findById |
| findByAccountName |
| findAll |
| destroy |
| addContactToAccount |
| createCustomFiled |
| setCustomFieldValue |
| getCustomFieldValueById |
| getAllCustomFieldvalues |
| createBulkCustomFieldValues |
| getCustomField |
| getAllCustomFields |
| destoryCustomFieldById |
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
| createCustomField |
| getCustomFieldValue |
| setCustomFieldValue |

### Deal

| Methods              |
| -------------------- |
| create               |
| update               |
| findById             |
| findByTitle          |
| findAll              |
| destory              |
| addNote              |
| updateNote           |
| createCustomFiled    |
| setCustomFieldValue  |
|  getCustomFieldValue |

### List


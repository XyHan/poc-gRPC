const client = require('../client');

client.get({ id: 1 }, (error, notes) => {
    if (!error) {
        console.log(notes);
    } else {
        console.log(error);
    }
})

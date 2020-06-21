const client = require('../client');
const newNote = { title: 'New Note', content: 'New Note Content' };

client.insert(newNote, (error, note) => {
    if (!error) {
        console.log(note);
    } else {
        console.log(error);
    }
});

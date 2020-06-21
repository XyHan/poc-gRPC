const client = require('../client');
const updatedNote = { id: 1, title: 'New Title After Update' };

client.update(updatedNote, (error, note) => {
    if (!error) {
        console.log(note);
    } else {
        console.log(error);
    }
});

const { generateJSON } = require('./helpers/writeJSON');

generateJSON()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })


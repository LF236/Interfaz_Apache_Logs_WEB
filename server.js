const { generateJSON } = require('./helpers/writeJSON');
/*
generateJSON()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
*/
const http = require('http');
const host = '127.0.0.1';
const port = 8082;

let indexHTML = null;
const fs = require('fs').promises;

console.log(__dirname + '/index.html');
const requestListener = (req,res) => {
    console.log(req.url);
    switch(req.url) {
        case '/':
            res.writeHead(200);
            res.end('Return');
            break;
        default:
            res.writeHead(401);
            res.end('Resource not found');
    }
    
}

const server = http.createServer(requestListener);
server.listen(port,host,() => {
    console.log(`Servidor levantado ${host}:${port}`);
})
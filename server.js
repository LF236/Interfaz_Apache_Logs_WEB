const { generateJSON } = require('./helpers/writeJSON');
const { getDataLogs } = require('./helpers/readJSON');
//
const getLogs = async () => {
    try {
        //Esta promesa tiene como objetivo escribir el JSON, si se escribe bien devuelve un true
        const responseGenerateJSON = await generateJSON();
        const data = await getDataLogs('logs.json');
        return data;
    }catch(error) {
        console.log('EL MANEJO DE LOS LOGS SALIO MAL');
        throw error;
    }
}
//Servidor de peticiones WEB
const http = require('http');
const host = '127.0.0.1';
const port = 8082;


//console.log(__dirname + '/index.html');
const requestListener = async (req, res) => {
    console.log(req.url);
    switch (req.url) {
        case '/':
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200);
            res.end('Return');
            break;
        case '/loadDataAccessLogs':
            getLogs()
                .then(data => {
                    console.log('Piden json');
                    console.log(data);
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    res.setHeader("Content-Type", "text/plain");
                    res.writeHead(200);
                    res.end(data);
                })
                .catch(err => {
                    console.log('Error al procesar el JSON');
                    console.log(err);
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    res.setHeader("Content-Type", "text/plain");
                    res.writeHead(500);
                    res.end(`Error al procesar el JSON ${err}`);
                })
            break;
        default:
            console.log('Error');
            res.writeHead(401);
            res.end('Resource not found');
    }

}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Servidor levantado ${host}:${port}`);
})
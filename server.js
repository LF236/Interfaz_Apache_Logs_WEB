const { generateJSON } = require('./helpers/writeJSON');
const { getDataLogs } = require('./helpers/readJSON');
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
            try {
                //Esta promesa tiene como objetivo escribir el JSON, si se escribe bien devuelve un true
                const responseGenerateJSON = await generateJSON();
                //Si devuelve un true procedemmos a leer el JSON obtenido y lo mandamos al cliente
                if (responseGenerateJSON) {
                    const data = await getDataLogs('logs.json');
                    console.log('Piden json');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(data);
                }
            } catch (err) {
                //Manejo de errores de las dos funciones anteriores
                console.log('Error al procesar el JSON');
                console.log(err);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                res.setHeader("Content-Type", "text/plain");
                res.writeHead(500);
                res.end(`Error al procesar el JSON ${err}`);
            }
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
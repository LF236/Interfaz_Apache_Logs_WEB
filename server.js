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
                const responseGenerateJSON = await generateJSON();
                if (responseGenerateJSON) {
                    //const data = await getDataLogs('logs.json');
                    //console.log(data);
                    const data = await getDataLogs();
                    console.log('Piden json');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    //res.setHeader("Content-Type", "application/json");
                    res.setHeader("Content-Type", "text/plain");
                    res.writeHead(200);
                    console.log("data");
                    res.end("data");
                }
            } catch (err) {
                console.log('Error al procesar el JSON');
                console.log(err);
                
                
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                res.setHeader("Content-Type", "text/plain");
                res.writeHead(500);
                res.end("err");
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
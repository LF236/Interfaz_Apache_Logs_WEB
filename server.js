//Importamos funciones de los Scripts que se encuentran en la carpeta helpers
const { generateJSON } = require('./helpers/writeJSON');
const { getDataLogs } = require('./helpers/readJSON');
const colors = require('colors');
//Usamos YARGS, esto para trabajar con los parametros de entrada en la consola
const argv = require('yargs')
    .options('f', {
        alias: 'file',
        demandOption: true,
        description: 'Archivo de logs, que es el que se va a estar monitoreando',
        type: 'string'
    })
    .argv
;
//
let file_logs = argv.file;
//Esta es la función con la que manejamos las dos funciones que importamos anteriormente
//Primero procesamos el JSON con los logs, y finalmente leemos el JSON generado
const getLogs = async () => {
    //Cerramos todo en un try, si de alguna función hay un error el catch los recoge
    try {
        const responseGenerateJSON = await generateJSON(file_logs);
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

//Función para escuchar las peticiones
//Con base a la URL que el Navegador solicite la procesamos dentro del Switch para responder
const requestListener = async (req, res) => {
    console.log(req.url);
    switch (req.url) {
        case '/':
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200);
            res.end('Return');
            break;
        //Para no sobrecargar el servidor, solo va a procesar la URL loadData (Posible a cambios)
        case '/loadDataAccessLogs':
            getLogs()
                .then(data => {
                    console.log('Piden json');
                    //Creamos las cabeceras, lo hacemos lo mas básico con reglas de control, y el JSON lo mandamos
                    //pero en texto plano, esto por preferencias, ya que en la parte del FrontEnd, es más fácil
                    //leer un texto plano y pasarlo a JSON
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    res.setHeader("Content-Type", "text/plain");
                    //Mandamos el código de respuesta
                    res.writeHead(200);
                    //Mandamos la data
                    res.end(data);
                })
                .catch(err => {
                    console.log('Error al procesar el JSON');
                    console.log(err);
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With");
                    res.setHeader("Content-Type", "text/plain");
                    //En caso de error, solo lo mandamos con un código 500
                    res.writeHead(500);
                    res.end(`Error al procesar el JSON ${err}`);
                })
            break;
        //En caso de error, regresamos un error 401
        default:
            console.log('Error');
            res.writeHead(401);
            res.end('Resource not found');
    }

}

//Levantar Servidor WEB que estará a la escucha de las peticiones
//Pasamos la función que tenemos preparada para procesar las escuchas
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(colors.rainbow(`Servidor levantado ${host}:${port}`));
})
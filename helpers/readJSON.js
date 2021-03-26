//El objetivo de la siguiente función es leer el archivo JSON creado a partir del access_log
//Este es el que será regresado cuando se haga una petición al servidor para mostrar la data 

const fs = require('fs');
const getDataLogs = (routeFile) => {
    return new Promise((resolve,reject) => {
        fs.readFile(routeFile,'utf-8',(error,data) => {
            if(error) {
                //console.log(err); 
                reject(`El archivo no ha sido leido correctamente ${error}`);
                return;
            }
            resolve(data);
        })
    })
}

module.exports = {
    //getDataLogs = getDataLogs(), es redundante por eso lo resumimos
    getDataLogs
}
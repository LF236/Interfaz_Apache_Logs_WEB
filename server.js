const fs = require('fs');
const nameFile = 'access_log';

//Esta función es para leer el contenido del archivo
const generateDocumentJSON = (routeFile) => {
    return new Promise((resolve,reject) => {
        let json = "[";
        fs.readFile(routeFile,'utf-8',(error,data) => {
            //Si el archivo no existe
            if(error) {
                reject(error);
                return;
            }
            //Empezamos a filtrar la data
            const aux = data.split('\n');
            //console.log(aux.length);
            aux.forEach(line => {
                line = line.replace('"','');
                line = line.replace('"','');
                let auxSplit = line.split(' ');
                //Recolectamos la data
                let dirIp = auxSplit[0];
                let dateComplete = auxSplit[3];
                let hour;
                try {
                    dateComplete = dateComplete.replace("[","");
                    dateComplete = dateComplete.split(':');
                    hour = `${dateComplete[1]}:${dateComplete[2]}:${dateComplete[3]}`;
                    dateComplete = dateComplete[0];
                }catch(err) {
                    hour = null;
                }
                let method = auxSplit[5];
                let resource = auxSplit[6];
                let protocol = auxSplit[7];
                let codeRequest = auxSplit[8];
                //Creamos el fragmeto con línea
                const jsonElement = `
                    {
                        ip: ${dirIp},
                        date: ${dateComplete},
                        hour: ${hour},
                        method: ${method},
                        resource: ${resource},
                        protocol: ${protocol},
                        codeRequest: ${codeRequest}
                    },
                `;
                json += jsonElement;
            })
            json += "]";
            resolve(json);
        })
    })
}

const getData = async () => {
    try {
        const data = await generateDocumentJSON(nameFile);
        return data;
    }
    catch (error){
        console.log('EL ARCHIVO NO SE HA PROCESADO CORRECTAMENTE');
        throw error;
    }
}

getData()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
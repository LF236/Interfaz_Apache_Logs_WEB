//-----------Procesamiento de datos------------------
const fs = require('fs');
const outputFile = 'logs.json';
//Esta función es para leer el contenido del archivo access_logs es una promesa para el manejo de callbacks
const readLogs = (routeFile) => {
    return new Promise((resolve,reject) => {
        let json = '[';
        fs.readFile(routeFile,'utf-8',(error,data) => {
            //Si el archivo no existe
            if(error) {
                reject(error);
                return;
            }
            //Empezamos a filtrar la data
            const aux = data.split('\n');
            //Auxiliar para no imprimir una coma al último siempre
            const auxLength = aux.length;
            let count = 0;
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
                    dateComplete = dateComplete.replace('[','');
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
                        "ip": "${dirIp}",
                        "date": "${dateComplete}",
                        "hour": "${hour}",
                        "method": "${method}",
                        "resource": "${resource}",
                        "protocol": "${protocol}",
                        "codeRequest": "${codeRequest}"
                    }
                `;
                count += 1;
                //Solución al error de peticiones sin codigo de respuesta de apache, esto generaba conflictos en Windows
                if(protocol != '-' && method != '-') {
                    json += jsonElement;
                    if(count < auxLength) json += ',';
                }
                
            })
            json += ']';
            resolve(json);
        })
    })
}

//Esta función es usada para escribir el documento JSON con la información filtrada del access_log
const writeJSON = (data) => {
    try {
        fs.writeFileSync('logs.json',data);
        return `El archivo ${outputFile} ha sido generado corectamente`;
    }
    catch(err) {
        throw `El archivo ${outputFile} no se ha podido generar correctamente`;
    }
}

//Esta función es la que hace los dos procesos, primero leer y filtrra y finalmente escribe el JSON
const generateJSON = async (nameFile) => {
    try {
        const data = await readLogs(nameFile);
        await writeJSON(data);
        //Si el archivo pudo ser leido y el JSON escrito correctamente
        //Regresamos un boolean
        return true;
    }
    catch (error){
        console.log('Todo Salio Mal');
        throw error;
    }
}

//Exportamos la función para que pueda ser usado por el archivo principal
module.exports = {
    generateJSON
}
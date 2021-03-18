//-----------Procesamiento de datos------------------
const fs = require('fs');
const nameFile = 'access_log';

//Esta función es para leer el contenido del archivo es una promesa para el manejo de callbacks
const generateDocumentJSON = (routeFile) => {
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
                json += jsonElement;
                if(count < auxLength) json += ',';
            })
            json += ']';
            resolve(json);
        })
    })
}

const writeJSON = (data) => {
   fs.writeFileSync('logs.json',data,'UTF-8', (err) => {
       if(err) {
           console.log('TODO SALIO MAL');
       }
       else {
           console.log('Its OK');
           fs.readFileSync('logs.json',"utf-8");
       }
   })
}


const loadJSON = async () => {
    try {
        const data = await generateDocumentJSON(nameFile);
        await writeJSON(data);
        return true;
    }
    catch (error){
        console.log('Todo Salio Mal');
        throw error;
    }
}

loadJSON()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

//----------------Servidor-----------
//Este archivo es solo para procesar las acciones que realizan los botones de la WEB
const loadData = document.getElementById('btn-loadData');
const btn_filterOkPetition = document.getElementById('btn-codeOK');
const btn_redirePetition = document.getElementById('btn-codeRedire');
const btn_errorClientPetition = document.getElementById('btn-codeErrorClient');
const btn_errorServerPetition = document.getElementById('btn-codeErrorServer');
const centerData = document.getElementById('centerContent');
const btnCodeTable = document.getElementById('btn-table-morePetitions');
const btnTrafficTable = document.getElementById('btn-table-traffic');
/*
    Nota Importante: Para no tener que hacer la petición al servidor constantemente para solicitar 
    el JSON con la información de los logs, cuando carguemos la tabla principal "LoadData", almacenamos
    la data dentro de una variable "auxData", esta se actualizará cada vez que recarguemos la tabla principal,
    esta desición es para reducir el tiempo de espera al momento de hacer la petición y nos ayudara en todo.
*/
let auxData = null;
//Libreria AJAX para hacer peticiones a nuestro servidor backend (NODEJS)
const request = (requestData) => {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(requestData.method,requestData.url,true);
        xhr.addEventListener('load',e => {
            resolve(e.target);
        })
        xhr.send();
    })
}
//Esta es la función que se encarga de mostrar todo el JSON que nos devuelve el backend (NODEJS)
//Se activa al dar clic al botón "LOAD DATA"
loadData.addEventListener('click', async() => {
    const data = await request({method: 'GET', url: 'http://127.0.0.1:8082/loadDataAccessLogs'});
    //console.log(data.responseText);
    //console.log(JSON.parse(data.responseText));
    auxData = JSON.parse(data.responseText);
    filter(0,auxData);
})

//Boton para filtrar peticiones satisfactorias
btn_filterOkPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    filter(200,auxData);
})

//Boton para filtrar peticiones de Redirección
btn_redirePetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    filter(300,auxData);
})

//Boton para filtrar errores del cliente
btn_errorClientPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    filter(400,auxData);
})

//Botón para filtrar errores del server
btn_errorServerPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    filter(500,auxData);
})
//
btnTrafficTable.addEventListener('click', () => {
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    printGraph('tableOfTraffic', auxData);
})
//Botón para mostrar la gráfica de los códigos de respuesta
btnCodeTable.addEventListener('click', () => {
    if(auxData === null) {
        errorPrintData();
        return 0;
    }
    printGraph('tableOfCodes',auxData);
})
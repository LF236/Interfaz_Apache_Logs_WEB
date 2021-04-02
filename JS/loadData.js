const loadData = document.getElementById('btn-loadData');
const btn_filterOkPetition = document.getElementById('btn-codeOK');
const btn_redirePetition = document.getElementById('btn-codeRedire');
const btn_errorClientPetition = document.getElementById('btn-codeErrorClient');
const btn_errorServerPetition = document.getElementById('btn-codeErrorServer');
const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');
const centerData = document.getElementById('centerContent');
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
showBtnTables.addEventListener('click', () => {
    //Mostrar los botones de las tablas
    tablesContent.classList.toggle('appear');
})

//Esta es la función que se encarga de mostrar todo el JSON que nos devuelve el backend (NODEJS)
//Se activa al dar clic al botón "LOAD DATA"
loadData.addEventListener('click', async() => {
    const data = await request({method: 'GET', url: 'http://127.0.0.1:8082/loadDataAccessLogs'});
    //console.log(data.responseText);
    auxData = JSON.parse(data.responseText);
    filter(0,auxData);
})

btn_filterOkPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        return console.log('No hay data en la cache');
    }
    filter(200,auxData);
})

btn_redirePetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        return console.log('No hay data en la cache');
    }
    filter(300,auxData);
})

btn_errorClientPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        return console.log('No hay data en la cache');
    }
    filter(400,auxData);
})


btn_errorServerPetition.addEventListener('click', () => {
    //Mandamos a llamar a la función que se encuentra dentro del archivo filtrarData.js, pasamos como parametros
    //la data y que es un codigo 200
    if(auxData === null) {
        return console.log('No hay data en la cache');
    }
    filter(500,auxData);
})
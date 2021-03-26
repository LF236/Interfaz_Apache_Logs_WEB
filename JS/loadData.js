const loadData = document.getElementById('btn-loadData');
const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');

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
//Función parar imprimir la data que obtenemos al hacer una petición al server
const printData = (data) => {
    //Recorremos el JSON elemento por elemento
    //Tenemos que recorrer desde el último elemento que sería el último elemento solicitado
    data.slice().reverse().forEach(el => {
        const HTML = `
            <li>
                <p></p>
            </li>
        `
    })
}
showBtnTables.addEventListener('click', () => {
    //Mostrar los botones de las tablas
    tablesContent.classList.toggle('appear');
})

//Esta es la función que se encarga de mostrar todo el JSON que nos devuelve el backend (NODEJS)
loadData.addEventListener('click', async() => {
    const data = await request({method: 'GET', url: 'http://127.0.0.1:8082/loadDataAccessLogs'});
    //console.log(data.responseText);
    printData(JSON.parse(data.responseText));
})
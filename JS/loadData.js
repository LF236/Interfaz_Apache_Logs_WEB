const loadData = document.getElementById('btn-loadData');
const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');
const centerData = document.getElementById('centerContent');
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
    let table = document.createElement('table');
    let aux = document.createDocumentFragment();
    centerData.innerHTML = '';
    //Recorremos el JSON elemento por elemento
    //Tenemos que recorrer desde el último elemento que sería el último elemento solicitado
    const tableTitles = `
        <tr>
        <th>IP</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Método</th>
        <th>Recurso</th>
        <th>Código de Respuesta</th>
        </tr>
    `
    table.insertAdjacentHTML('beforeend',tableTitles);
    data.slice().reverse().forEach(el => {
        //Definimos el color de fondo del codigo de respuesta con base a nuestro código de colores
        let backgroundCodeRequest = '';
        const codeFirstNumber = (el.codeRequest).split('');
        //console.log(codeFirstNumber);
        switch(codeFirstNumber[0]) {
            case '1':
                backgroundCodeRequest = 'resInformative';
                break;
            case '2':
                backgroundCodeRequest = 'resOk';
                break;
            case '3':
                backgroundCodeRequest = 'resRedirection';
                break;
            case '4':
                backgroundCodeRequest = 'resErrClient';
                break;
            case '5':
                backgroundCodeRequest = 'resErrServer';
                break;
            default:
                console.log('Error');
                
        }
        //Creamos la estructura de un elemento de un tabla en HTML
        const tableElement = `
            <tr>
                <td>${el.ip}</td>
                <td>${el.date}</td>
                <td>${el.hour}</td>
                <td>${el.method}</td>
                <td class="recurso">${el.resource}</t>
                <td class=${backgroundCodeRequest}>${el.codeRequest}</td>
            </tr>
        `;
        if(!(el.method === 'undefined')) {
            //console.log('NO');
            table.insertAdjacentHTML('beforeend',tableElement);
        }
        
    })
    //console.log(aux);
    
    //console.log(table);
    centerData.appendChild(table);
    
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
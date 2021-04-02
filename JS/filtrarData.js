//Esta función es para imprimir la data, pero sin ningún filtro (0)
//Función parar imprimir la data que obtenemos al hacer una petición al server (Tabla principal)
const printData = (data) => {
    let table = document.createElement('table');
    //Creamos e insertamos las cabezeras de la tabla principal
    centerData.innerHTML = '';
    const tableTitles = `
        <tr>
        <th>IP</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Método</th>
        <th>Recurso</th>
        <th>Código de Respuesta</th>
        </tr>
    `;
    table.insertAdjacentHTML('beforeend', tableTitles);
    //Creamos cada elemento de la tabla HTML recorriendo la data y filtrandola con los "if"
    data.slice().reverse().forEach(el => {
        let codeRequest = parseInt(el.codeRequest);
        /*
            Creamos un rango, el codigo de respuesta tiene que ser mayor o igual al filtro y menor al (filtro + 100), 
            que es el siguiente grupo de los códigos de respuesta HTTP 
        */

        //Definimos el color de fondo del codigo de respuesta con base a nuestro código de colores
        let backgroundCodeRequest = '';
        const codeFirstNumber = (el.codeRequest).split('');
        //console.log(codeFirstNumber);
        switch (codeFirstNumber[0]) {
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
        //Tratamos el error del algún log mal registrado
        if (!(el.method === 'undefined')) {
            //console.log('NO');
            table.insertAdjacentHTML('beforeend', tableElement);
        }

    })
    //Agregamos la variable tabla al DOM de nuestro HTML, que es hijo de "centerData"
    centerData.appendChild(table);
}

//En esta función procesamos los datos que vamos a imprimir con base al codigo del filtro
const printFilteredData = (code, data) => {
    let table = document.createElement('table');
    //Creamos e insertamos las cabezeras de la tabla principal
    centerData.innerHTML = '';
    const tableTitles = `
        <tr>
        <th>IP</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Método</th>
        <th>Recurso</th>
        <th>Código de Respuesta</th>
        </tr>
    `;
    table.insertAdjacentHTML('beforeend', tableTitles);
    //Creamos cada elemento de la tabla HTML recorriendo la data y filtrandola con los "if"
    data.slice().reverse().forEach(el => {
        let codeRequest = parseInt(el.codeRequest);
        /*
            Creamos un rango, el codigo de respuesta tiene que ser mayor o igual al filtro y menor al (filtro + 100), 
            que es el siguiente grupo de los códigos de respuesta HTTP 
        */
        if ((codeRequest >= code) && (codeRequest < (code + 100))) {
            //Definimos el color de fondo del codigo de respuesta con base a nuestro código de colores
            let backgroundCodeRequest = '';
            const codeFirstNumber = (el.codeRequest).split('');
            //console.log(codeFirstNumber);
            switch (codeFirstNumber[0]) {
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
            //Tratamos el error del algún log mal registrado
            if (!(el.method === 'undefined')) {
                //console.log('NO');
                table.insertAdjacentHTML('beforeend', tableElement);
            }
        }
    })
    //Agregamos la variable tabla al DOM de nuestro HTML, que es hijo de "centerData"
    centerData.appendChild(table);
}

//Es la función que se conecta con el loadData, en ella mandamos el código para hacer los filtros correspondientes
//Si el código es 0, hace referencia a imprimir la tabla completa sin ningún filtro
const filter = (code, data) => {
    switch (code) {
        case 0:
            printData(data);
            break;
        case 200:
            printFilteredData(code, data);
            break;
        case 300:
            printFilteredData(code, data);
            break;
        case 400:
            printFilteredData(code, data);
            break;
        case 500:
            printFilteredData(code, data);
            break;
        default:
            console.log('Error al cargar la data');
    }
}


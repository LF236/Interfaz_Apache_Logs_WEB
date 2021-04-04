let theChart = null
//Con esta función creamos las gráficas, esta es una libreria llamada CHART.JS, en el readme esta el link.
/*
    Parametros Necesarios
        dataRecolected: Serie de datos, tiene que corresponder con el headOfTable,
        headOfTable: Los titulos de los elementos del eje horizontal,
        label: El titulo de la tabla,
        backgroundColors: Colores del background, tienen que corresponder al No. de elementos de titulos,
        borderColors: Colores de border para las barras de la gráfica, igual tienen que coincidir con el No. de titulos 
*/
const loadChart = (dataRecolected,headOfTable,label,backgroundColors,borderColors) => {
    const ctx = myChart.getContext('2d');
    myChart.width = 200;
    myChart.height = 100;
    theChart = new Chart(ctx, {
        type : 'bar',
        data : {
            labels: headOfTable,
            datasets: [{
                label: label,
                data: dataRecolected,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWith: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}

//Función para crear filtrar la data para la gráfica de códigos de respuesta
const tableOfCodes = (data) => {
    //Contadores para cada uno de los tipos de respuesta
    let resOk = 0,resDire = 0,resErrClient = 0,resErrServer = 0;
    //Leemos y recorremos la data
    data.forEach(el => {
        let code = el.codeRequest;
        //El codigo de respuesta del JSON lo partimos y solo obtenemos el primer digito
        let codeFirstDigite = code.split('');
        //Con base al primer digito, empezamos a hacer los incrementos correspondientes
        switch(codeFirstDigite[0]) {
            case '2':
                resOk += 1;
                break;
            case '3':
                resDire += 1;
                break;
            case '4':
                resErrClient += 1;
                break;
            case '5':
                resErrServer += 1;
                break;
        }
    })
    //Creamos los parametros que tienen que ser mandamos a la función "loadChart()"
    let dataRecolected = [resOk,resDire,resErrClient,resErrServer];
    let headOfTable = ["Respuestas Satisfactorias", "Redirección", "Error del Cliente", "Error del Servidor"];
    let label = "Gráfica de Códigos de Respuesta";
    let backgroundColors = [
        'rgba(18, 114, 18, 1)',
        'rgba(79, 15, 120, 1)',
        'rgba(251, 92, 36, 1)',
        'rgba(251, 36, 36, 1)'
    ]
    let borderColors = [
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
        'rgba(255,99,132,1)',
    ]
    //Borramos el contenido que tenga la variable centerData(las tablas) y creamos el HTML para crear la gráfica
    centerData.innerHTML = `
    <div class="contentGra" style="width: 100%; margin: auto;">
        <canvas id="myChart" width="200" height="100"></canvas>
    </div>
    `;
    //Recolentamos la varible del HTML creado anteriormente, ES IMPORTANTE que sea en este momento
    let myChart = document.getElementById('myChart')
    //Imprimimos la gráfica
    loadChart(dataRecolected,headOfTable,label,backgroundColors,borderColors);
}
const printTable = (id,data) =>{
    switch(id) {
        case 'tableOfCodes':
            tableOfCodes(data);
            break;
        default:
            console.log('ERROR');
    }
}
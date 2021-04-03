let theChart = null
let myChart = document.getElementById('myChart')
const loadChart = (dataRecolected,headOfTable,label,backgroundColors,borderColors) => {
    const ctx = myChart.getContext('2d')
    myChart.width = 200
    myChart.height = 200
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

const tableOfCodes = (data) => {
    let resOk = 0,resDire = 0,resErrClient = 0,resErrServer = 0;
    data.forEach(el => {
        let code = el.codeRequest;
        let codeFirstDigite = code.split('');
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
    let dataRecolected = [resOk,resDire,resErrClient,resErrServer];
    let headOfTable = ["Respuestas Satisfactorias", "Redirección", "Error del Cliente", "Error del Servidor"];
    let label = "Codigos de Respuesta";
    let backgroundColors = [
        'rgba(18, 114, 18, 0.2)',
        'rgba(79, 15, 120, 0.2)',
        'rgba(251, 92, 36, 0.2',
        'rgba(251, 36, 36, 0.2)'
    ]
    let borderColors = [
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
        'rgba(255,99,132,1)',
    ]
    centerData.innerHTML = '';
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
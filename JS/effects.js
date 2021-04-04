const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');

//Función para mostrar los botones para mostrar gráficas
showBtnTables.addEventListener('click', () => {
    //Mostrar los botones de las tablas
    tablesContent.classList.toggle('appear');
})

//Función para imprimir la animación de error al querer imprimir Data
const errorPrintData = () => {
    centerData.innerHTML = `
        <div class="errorPage">
        <div class="errorPage-image">
            <img src="./IMG/error.gif" alt="error_image">
        </div>
        <div class="errorPage-label">
            <p>Error, Presiona el botón "Load Data", antes de querer aplicar un filtro o imprimir una gráfica</p>
        </div>
        </div>
    `
}
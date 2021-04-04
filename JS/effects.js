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

//Animación de los botones para subirlos al hacer Scroll
window.addEventListener('scroll', e => {
    //65 = Tamaño del header
    const sizeHead = 70;
    console.log(window.scrollY);
    if(window.scrollY > 75) {
        document.body.classList.add('animation');
    }

    if(window.scrollY < 68) {
        document.body.classList.remove('animation');
    }
    
})
const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');

//Función para mostrar los botones para mostrar gráficas
showBtnTables.addEventListener('click', () => {
    //Mostrar los botones de las tablas
    tablesContent.classList.toggle('appear');
})
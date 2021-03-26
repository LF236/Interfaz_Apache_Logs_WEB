const loadData = document.getElementById('btn-loadData');
const showBtnTables = document.getElementById('btn-loadTables');
const tablesContent = document.getElementById('tables-content');


showBtnTables.addEventListener('click', () => {
    //Mostrar los botones de las tablas
    tablesContent.classList.toggle('appear');
})

loadData.addEventListener('click', () => {
    alert('Hello World');
})
Proyecto Administración Avanzada de Servicios
El objetivo de este proyecto es crear una manera más fácil de mostrar los LOGS de algún servicio, en este caso del Servidor Web Apache.
Esta aplicación esta escrita completamente en JavaScript, tanto en la parte del Backend y del Frontend.
Requisitos
    ```
	Navegador Web
	NodeJS (https://nodejs.org/es/download/)
    ```
Preparación
	1.Clonar el repositorio de node
		>git clone https://github.com/LF236/Interfaz_Apache_Logs_WEB.git
    2.Cargar Modulo de Node Necesarios
        >npm install 
        >El comando anterior cargara los modulos necesarios para ejecutar la aplicación, esta información se encuentra en el archivo package.json.
            >>YARGS => Mejora el procesamiento de parámetros en la consola.
            >>COLORS => Permite cambiar los colores cuando trabajamos en consola.
Ejecución
    1.node server.js -f access_log
        >Ejecutamos el servidor y pasamos como parámetro el archivo access_log de nuestro servidor apache.
        >Si estamos en un entorno linux es necesario dar permisos o ejecutar con sudo.
    2.node server.js --help
        >Muestra la ayuda de la aplicación.
    3.Abrir el archivo index.html con nuestro navegador predeterminado
        >No es necesario introducir una URL para abrir la página HTML, solo con hacer doble clic le navegador la abrira.
        >No es necesario abrirla con un servidor o servicio adicional.



Luis Fernando Rodríguez Hernández
Universidad Veracruzana



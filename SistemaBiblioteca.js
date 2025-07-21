const libros = [ //Utilizo const porque es información que no voy a reasignar pero si modificar.
            {id: 1, titulo: ' Sin querer queriendo ', autor: 'Roberto Gómez Bolaños', anio: 2006, genero: 'Biografía', disponibilidad: false }, // El uso de {} es para señalar que son propiedades de cada array.
            {id: 2, titulo: 'La última actriz', autor: 'Tamara Tenenbaum', anio: 2024, genero: 'Ficción', disponibilidad: true },// El uso de true (booleano) indica que el libro está disponible, de lo contrario, fue prestado.
            {id: 3, titulo: 'Un millón de cuartos propios', autor: 'Valeria Tentoni', anio: 2021, genero: 'Ensayo', disponibilidad: false },
            {id: 4, titulo: 'La biblioteca de la medianoche', autor: 'Matt Haig', anio: 2020, genero: 'Ficción', disponibilidad: false },
            {id: 5, titulo: ' El arte de aburrirse ', autor: 'Lars Svendsen', anio: 2007, genero: 'Ensayo', disponibilidad: true },
            {id: 6, titulo: 'La digestión es la cuestión', autor: 'Giulia Enders', anio: 2014, genero: 'No ficción', disponibilidad: false },
            {id: 7, titulo: 'Hábitos atómicos', autor: 'James Clear', anio: 2018, genero: 'Desarrollo personal', disponibilidad: true },
            {id: 8, titulo: 'La enfermedad del aburrimiento', autor: 'Enric Puig Punyet', anio: 2020, genero: 'Ensayo', disponibilidad: false},
            {id: 9, titulo: 'El cuerpo lleva la cuenta', autor: 'Bessel van der Kolk', anio: 2014, genero: 'Psicología', disponibilidad: false },
            {id: 10, titulo: 'Un animal salvaje', autor: 'Joël Dicker', anio: 2023, genero: 'Ficción', disponibilidad: true },
            {id: 11, titulo: ' El tiempo que tuvimos ', autor: 'María Oruña', anio: 2024, genero: 'Ficción', disponibilidad: false },
            {id: 12, titulo: 'El faro de los amores dormidos', autor: 'Mónica Carrillo', anio: 2020, genero: 'Ficción', disponibilidad: true },
            {id: 13, titulo: 'Matate, amor', autor: 'Ariana Harwicz', anio: 2012, genero: 'Ficción', disponibilidad: false },
            {id: 14, titulo: 'La química del amor', autor: 'Ali Hazelwood', anio: 2022, genero: 'Ficción', disponibilidad: false },
            {id: 15, titulo: 'Amigos, amantes y aquello tan terrible', autor: 'Matthew Perry', anio: 2022, genero: 'Biografía', disponibilidad: false },
            {id: 16, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, genero: 'Ficción', disponibilidad: true},
            {id: 17, titulo: 'Rayuela', autor: 'Julio Cortázar', anio: 1963, genero: 'Ficción', disponibilidad: false },
            {id: 18, titulo: '1984', autor: 'George Orwell', anio: 1949, genero: 'Ficción', disponibilidad: true }
];

const usuarios = [ //Nuevamente utilizo const porque es información que no voy a reasignar pero si modificar.
            { id: 101, nombre: 'Sofía González', email: 'sofia.gonzalez@gmail.com', librosPrestados: [3] }, //En libros prestados uso corchetes porque estoy usando una propiedad del array Libros.
            { id: 102, nombre: 'Lucas Fernández', email: 'lucas.fernandez@gmail.com', librosPrestados: [1, 14] },
            { id: 103, nombre: 'Martina López', email: 'martina.lopez@gmail.com', librosPrestados: [4, 8, 17] },
            { id: 104, nombre: 'Mateo Ramírez', email: 'RAMIREZMATEO@GMAIL.COM', librosPrestados: [6] },
            { id: 105, nombre: 'Valentina Torres', email: 'valentina.torres@gmail.com', librosPrestados: [9] },
            { id: 106, nombre: 'Thiago Medina', email: 'thiago.medina@gmail.com', librosPrestados: [11] },
            { id: 107, nombre: 'Camila Herrera', email: 'CAMILAH@GMAIL.COM', librosPrestados: [13, 15] }
];

const prompt = require('prompt-sync')();

//Función para mostrar los libros que cada usuario tiene en préstamo.
function mostrarLibrosDeUsuario(idUsuario) {
    const usuario = usuarios.find(u => u.id === idUsuario);

    if (!usuario) {
        console.log('Usuario no encontrado.');
        return;
    }

    console.log('\nLibros prestados');

    if (usuario.librosPrestados.length === 0) {
        console.log('Sin libros prestados.');
    } else {
        usuario.librosPrestados.forEach(idLibro => {
            const libro = libros.find(libro => libro.id === idLibro);
            if (libro) {
                console.log(`- ${libro.titulo} (Autor@: ${libro.autor})`);
            } else {
                console.log(`- Libro con id. ${idLibro} no encontrado.`);
            }
        });
    }
};
let idUsuario = '';

//Función para normalizar los datos que se ingresan en usuarios y libros
function normalizarDatos () {
    for (let i = 0; i < libros.length; i++) {
        libros[i].titulo = libros[i].titulo.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
        libros[i].autor = libros[i].autor.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        libros[i].genero = libros[i].genero.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    
     for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].email = usuarios[i].email.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
        usuarios[i].nombre = usuarios[i].nombre.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
};

function normalizarDatosUsuario(texto, enMayusculas = false) {
    texto = texto.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return enMayusculas ? texto.toUpperCase() : texto.toLowerCase();
    }; 

normalizarDatos()

//Se ordena el sistema de bibliotecas a partir de un menú principal y varios submenús.

//Menú Libro: Opciones Avanzadas
function menuLibroAvanzado() {
    let opcionLibroAvanzado = 0;
    do {
        console.log('\nMENÚ LIBRO AVANZADO\n1. Filtrar por palabras en título\n2. Ver estadísticas\n0. Volver');
        opcionLibroAvanzado = parseInt(prompt('Ingrese el número de la opción escogida: '));

        switch (opcionLibroAvanzado) {
            
    //Función para buscar títulos compuestos.        
            case 1:
                function librosConPalabrasEnTitulo(libros) {
                    const letrasValidas = 'abcdefghijklmnopqrstuvwxyz '; 

                    let librosFiltrados = libros.filter(libro => {
                        let tituloLimpio = libro.titulo.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                        for (let i = 0; i < tituloLimpio.length; i++) {
                            let letra = tituloLimpio[i];
                            if (!letrasValidas.includes(letra)) {
                                return false;
                            }
                        }

                        let palabras = tituloLimpio.split(' ');
                        let cantidadPalabras = 0;
                        for (let i = 0; i < palabras.length; i++) {
                            if (palabras[i] !== '') {
                                cantidadPalabras++;
                            }
                        }

                        return cantidadPalabras > 1;
                    });

                    console.log('Libros con más de una palabra en el título (solo letras):'); 
                    librosFiltrados.forEach(libro => console.log(libro.titulo)); 

                    return librosFiltrados; 
                };
                librosConPalabrasEnTitulo(libros);
                break;

    //Función para calcular estadísticas respecto a los libros almacenados con el objeto Math.         
                case 2:
                function calcularEstadisticas () {
                    let aniosPublicacion = libros.map(libro => libro.anio);
                    console.log('Si miramos sólo los años de publicación de nuestra colección, obtenemos las siguientes estadísticas.');

                    //Promedio de años de publicación
                    let suma = 0;
                    for (let i = 0; i < aniosPublicacion.length; i++) {
                        suma += libros[i].anio;
                    };

                    let promedio = Math.ceil(suma / aniosPublicacion.length);
                    console.log('En promedio, nuestra colección es del año ' + promedio + '.');

                    //Año de publicación más frecuente (moda)
                    let moda = 0; 
                    let masFrecuente = 0;
                    let maxPublicaciones = 0;

                    let anioFrecuente = aniosPublicacion.reduce((acumulador, anios) => {
                        if (!acumulador[anios]) {
                            acumulador[anios] = 0;
                        };

                        acumulador[anios]++; 

                        if (acumulador[anios] > masFrecuente) {
                            masFrecuente = acumulador[anios];
                            moda = anios;
                        }
                        return acumulador; 
                    }, {});

                    maxPublicaciones = Math.max(...Object.values(anioFrecuente));

                    console.log('El año con más publicaciones (cant. ' + maxPublicaciones + ') es ' + moda + '.');

                    //La diferencia de años entre el libro más antiguo y más nuevo.
                    let masNuevo = Math.max(...aniosPublicacion);
                    let masAntiguo = Math.min(...aniosPublicacion);
                    let diferencia = masNuevo - masAntiguo;

                    console.log('La diferencia entre el libro más antiguo (' + masAntiguo + ') y el más nuevo (' + masNuevo + ') es de ' + diferencia + ' años.');
                }
                calcularEstadisticas ();
                break;
            case 0:
                break;
            default:
                console.log('Ingrese una opción válida.');
        }
    } while (opcionLibroAvanzado !== 0);
};

function menuLibroAdministrador() {
    let opcionLibroAdministrador = 0;
    do {
        console.log('\nMENÚ LIBRO ADMINISTRADOR\n1. Agregar libro\n2. Borrar libro\n0. Volver');
        
        opcionLibroAdministrador = parseInt(prompt('Ingrese el número de la opción escogida: '));

        switch (opcionLibroAdministrador) {
    //Función para el administrador: Agregar un libro nuevo.
            case 1:
                let nuevoLibro = [];
                function agregarLibro (nuevoLibro){
                    let nuevoLibro = { //Primero creo un objeto con todas las propiedades para que sea más fácil guardar la información en el array 'libros'
                            id: libros.length + 1, //el id lo asigna directamente el sistema para seguir la numeración del array.
                            titulo: normalizarDatosUsuario(prompt ('Ingrese el título: '), true), //La última función me permite que todo se quede en minúsculas.
                            autor: normalizarDatosUsuario(prompt ('Ingrese el autor: '), false),
                            anio: parseInt(prompt('Ingrese el año: ')), //Me aseguro que el año sea un número entero.
                            genero: normalizarDatosUsuario(prompt('Ingrese el género: '), false)
                        };
                    libros.push (nuevoLibro);
                };
                agregarLibro(nuevoLibro);
                break;
                
            case 2:
                let idBorrar = parseInt(prompt ('¿Qué título desea borrar? Ingrese el id.: ')); //El usuario ingresa el número del id. Me aseguro que sea un número entero.
                borrarLibro(idBorrar);
                break;

            case 0:
                break;

            default:
                console.log('Ingrese una opción válida.');
        }
    } while (opcionLibroAdministrador !== 0);
}



//Menú Principal
function menuPrincipal() {
    let opcionPrincipal = 0;
    do { 
        console.log('\nMENÚ PRINCIPAL' + '\n1. Libros' + '\n2. Usuarios' + '\n3. Préstamos' + '\n0. Salir'); 
        opcionPrincipal = parseInt(prompt('Ingrese el número de la opción escogida: ')); 
        switch (opcionPrincipal) {
                case 1:
                menuLibro();
                break;
            case 2:
                menuUsuario();
                break;
            case 3:
                menuPrestamos();
                break;
            case 0:
                console.log('Saliendo del sistema...');
                break;
            default:
                console.log('Ingrese una opción válida.');
        }
    } while (opcionPrincipal !== 0);
};


//Incialización del Menú Principal
menuPrincipal();
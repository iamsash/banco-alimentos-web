const enlaces = document.querySelectorAll('a[data-seccion]');
const secciones = document.querySelectorAll('.seccion');

enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();

        const idSeccion = this.getAttribute('data-seccion');

        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });

        enlaces.forEach(link => {
            link.classList.remove('active');
            link.classList.remove('activo-sub');
        });

        const seccionMostrar = document.getElementById(idSeccion);

        if (seccionMostrar) {
            seccionMostrar.classList.add('activa');
        }

        this.classList.add('active');
    });
});

// Menu desplegable con buscador
const btnMenu = document.querySelector('.btn-menu');
const dropdownMenu = document.querySelector('.dropdown-menu');
const searchInput = document.getElementById('search-input');
const menuItems = document.querySelectorAll('#menu-items li');

if (btnMenu && dropdownMenu) {
    btnMenu.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
        if (dropdownMenu.classList.contains('show')) {
            searchInput.focus();
        }
    });

    // Cerrar el menú al hacer clic afuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });     

    const menuResults = document.getElementById('menu-results');

    // Mostrar solo el campo de búsqueda en el menú
    const updateResults = () => {
        const searchTerm = searchInput.value.toLowerCase();
        let hasVisible = false;
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            const text = link.textContent.toLowerCase();
            if (searchTerm && text.includes(searchTerm)) {
                item.classList.remove('hidden');
                hasVisible = true;
            } else {
                item.classList.add('hidden');
            }
        });
        if (searchTerm && hasVisible) {
            menuResults.classList.add('show');
        } else {
            menuResults.classList.remove('show');
        }
    };

    // Funcionalidad de búsqueda
    searchInput.addEventListener('input', function() {
        updateResults();
    });

    // Cerrar menú al seleccionar un item
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
            searchInput.value = '';
            menuResults.classList.remove('show');
            menuItems.forEach(li => li.classList.remove('hidden'));
        });
    });

    // Limpiar resultados cuando se abre el menú y no hay texto
    btnMenu.addEventListener('click', function() {
        if (!dropdownMenu.classList.contains('show')) {
            searchInput.value = '';
            menuResults.classList.remove('show');
            menuItems.forEach(li => li.classList.remove('hidden'));
        }
    });
}


// Lista de imágenes sobre los aliados 
const imagenes = [

 "logo.png/el_asador.jpg",
 "logo.png/caritas_del_peru.jpg",
 "logo.png/grupo_huamani.jpg",
 "logo.png/plaza_vea.jpg",
 "logo.png/churrasqueria.jpg",
 "logo.png/aereopuerto.webp",
 "logo.png/artesanos_don_bosco.webp",
 "logo.png/oratoria_don_bosco.jpg",
 "logo.png/sunshine.jpg",
 "logo.png/calidez_andina.jpg",
];

const imagenAliado = document.getElementById("imagenAliado");
const barraProgreso = document.getElementById("barraProgreso");

let indiceActual = 0;
let progreso = 0;
const duracion = 5000; // 5 segundos
const intervalo = 50;  // actualización de barra cada 50ms

function cambiarImagen() {
  // efecto fade out
  imagenAliado.classList.add("fade-out");

  setTimeout(() => {
    indiceActual = (indiceActual + 1) % imagenes.length;
    imagenAliado.src = imagenes[indiceActual];
    imagenAliado.classList.remove("fade-out");
  }, 600);
}

function iniciarSlider() {
  setInterval(() => {
    cambiarImagen();
    progreso = 0;
    barraProgreso.style.width = "0%";
  }, duracion);

  setInterval(() => {
    progreso += (intervalo / duracion) * 100;

    if (progreso <= 100) {
      barraProgreso.style.width = progreso + "%";
    }
  }, intervalo);
}

iniciarSlider();
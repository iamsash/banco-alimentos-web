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
  "logo.png/asadorimg.jpg",
 "logo.png/caritas_del_peru.jpg",
 "logo.png/huamanigroup.jpg",
 "logo.png/churrasqueria.jpg",
 "logo.png/aereopuerto.jpg",
 "logo.png/artesanos_don_bosco.jpg",
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


// imagenes de los reportes
const images = [
  "img.inicio/portada.png",
  "img.inicio/gratamente.png",
  "img.inicio/historico.png",
  "img.inicio/historico_rescate_anual.png",
  "img.inicio/rescate_de_alimentos.png",
  "img.inicio/rescate_mensual_23.png"

];

const sliderPrincipal = document.getElementById("sliderPrincipal");
const sliderImage = document.getElementById("sliderImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
let autoSlide;

/* Mostrar imagen actual */
function showImage(index) {
  if (!sliderImage) return;

  sliderImage.classList.add("fade-out");

  setTimeout(() => {
    sliderImage.src = images[index];
    sliderImage.classList.remove("fade-out");
    updateIndicators();
  }, 300);
}

/* Actualizar indicadores */
function updateIndicators() {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentIndex);
  });
}

/* Siguiente imagen */
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

/* Imagen anterior */
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

/* Auto slide cada 5 segundos */
function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    nextImage();
  }, 5000);
}

/* Reiniciar auto slide cuando se toca manualmente */
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

/* Eventos botones */
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
  });
}

/* Eventos indicadores */
indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.dataset.index);
    showImage(currentIndex);
    resetAutoSlide();
  });
});

/* Mostrar u ocultar slider según la sección activa */
function controlarSlider() {
  const inicio = document.getElementById("inicio");

  if (!inicio || !sliderPrincipal) return;

  if (inicio.classList.contains("activa")) {
    sliderPrincipal.style.display = "block";
    startAutoSlide();
  } else {
    sliderPrincipal.style.display = "none";
    clearInterval(autoSlide);
  }
}

/* Iniciar */
showImage(currentIndex);
controlarSlider();

/* Observar cambios de clase en la sección inicio */
const inicioSection = document.getElementById("inicio");

if (inicioSection) {
  const observer = new MutationObserver(() => {
    controlarSlider();
  });

  observer.observe(inicioSection, {
    attributes: true,
    attributeFilter: ["class"]
  });
}



// las imagenes de quienes somos

// Imágenes de la sección "Quiénes somos"
const imagenesQuienesSomos = [
  "img.quienes_somos/banco.jpg",
  "img.quienes_somos/grupo.jpg",
  "img.quienes_somos/frutas.jpg",
  "img.quienes_somos/grupoo.jpg",
  
];

const sliderQuienesSomos = document.getElementById("imagenQuienesSomos");
let indiceQuienesSomos = 0;

function cambiarImagenQuienesSomos() {
  if (sliderQuienesSomos) {
    sliderQuienesSomos.src = imagenesQuienesSomos[indiceQuienesSomos];
    indiceQuienesSomos = (indiceQuienesSomos + 1) % imagenesQuienesSomos.length;
  }
}

// Cambiar imagen cada 4 segundos
setInterval(cambiarImagenQuienesSomos, 4000);


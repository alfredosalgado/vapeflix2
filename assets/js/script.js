document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector('.whatsapp-btn');

  if (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el navegador siga el enlace `href`
      const phone = '56965527123'; // Número de teléfono
      const message = 'Hola, me interesa obtener más información.';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
  } else {
    console.error("No se encontró el botón de WhatsApp en el DOM.");
  }
});

// Obtén el botón de "Subir"
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Cuando el usuario haga scroll hacia abajo, muestra el botón
window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopBtn.style.display = "flex"; // Muestra el botón
  } else {
    scrollToTopBtn.style.display = "none"; // Oculta el botón
  }
};

// Cuando el usuario haga clic en el botón, realiza el desplazamiento suave
scrollToTopBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita la acción predeterminada de ancla

  // Desplazamiento suave hasta la parte superior
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Añade la transición suave
  });
});















document.addEventListener("DOMContentLoaded", () => {
  const titulos = document.querySelectorAll(".titulo-animado");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("titulo-visible"); // Agrega la animación cuando es visible
      } else {
        entry.target.classList.remove("titulo-visible"); // Quita la animación cuando deja de ser visible
      }
    });
  }, { threshold: 0.2 });

  titulos.forEach(titulo => observer.observe(titulo));
});



document.addEventListener("DOMContentLoaded", () => {
  const textos = document.querySelectorAll(".texto-fade");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("texto-visible"); // Activa la animación
      } else {
        entry.target.classList.remove("texto-visible"); // Permite que se repita
      }
    });
  }, { threshold: 0.2 });

  textos.forEach(texto => observer.observe(texto));
});








// Código anterior
const navbar = document.querySelector('.navbar');
const navbarCollapse = document.getElementById('navbarNavAltMarkup');

// Cambiar fondo al abrir/cerrar el menú
navbarCollapse.addEventListener('show.bs.collapse', () => {
  navbar.classList.remove('bg-ryf');
  navbar.classList.add('bg-translucido');
});

navbarCollapse.addEventListener('hide.bs.collapse', () => {
  navbar.classList.remove('bg-translucido');
  navbar.classList.add('bg-ryf');
});

// Cerrar menú hamburguesa al hacer clic en cualquier nav-link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
    if (collapseInstance && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.add('fade-out');

      // Espera la duración de la animación antes de colapsar
      setTimeout(() => {
        collapseInstance.hide(); // Oculta el menú
        navbarCollapse.classList.remove('fade-out'); // limpia la clase
      }, 300); // Debe coincidir con los 300ms del CSS
    }
  });
});




















// SECCION TESTIMONIOS
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}






// EVENTOS

document.addEventListener('DOMContentLoaded', () => {
  const totalFotos = 17;
  const carousel   = document.querySelector('.galeria-carousel');
  const nextBtn    = carousel.querySelector('.galeria-btn.next');
  const prevBtn    = carousel.querySelector('.galeria-btn.prev');
  const slides     = [];

  // 1) Generar slides
  for (let i = 1; i <= totalFotos; i++) {
    const slide = document.createElement('div');
    slide.className = 'galeria-slide';
    const img = document.createElement('img');
    img.src = `./assets/img/galeria/${i}.jpg`;
    img.alt = `Foto ${i}`;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => abrirModal(img.src));
    slide.appendChild(img);
    carousel.insertBefore(slide, nextBtn);
    slides.push(slide);
  }

  let currentFoto = 0;

  // 2) Detectar cuántas slides mostramos según el ancho
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 900) return 4;
    if (w >= 768) return 3;
    return 2;
  }

  // 3) Mostrar un rango de slides activos
  function showFoto(idx) {
    const count = getVisibleCount();
    slides.forEach((s, i) => {
      // activo si i está entre idx y idx+count-1 (con wrap-around)
      let active = false;
      for (let j = 0; j < count; j++) {
        if ((idx + j) % slides.length === i) {
          active = true;
          break;
        }
      }
      s.classList.toggle('active', active);
    });
  }

  // 4) Avanzar o retroceder de a "count" slides
  function nextFoto() {
    const count = getVisibleCount();
    currentFoto = (currentFoto + count) % slides.length;
    showFoto(currentFoto);
  }
  function prevFoto() {
    const count = getVisibleCount();
    currentFoto = (currentFoto - count + slides.length) % slides.length;
    showFoto(currentFoto);
  }

  nextBtn.addEventListener('click', nextFoto);
  prevBtn.addEventListener('click', prevFoto);

  // 5) Al cambiar el tamaño de ventana, refrescamos la vista
  window.addEventListener('resize', () => showFoto(currentFoto));

  // 6) Inicializamos la primera vista
  showFoto(currentFoto);

  // 7) Autoplay cada 4 segundos, también saltando de a "count"
  setInterval(nextFoto, 4000);

  // --- Modal igual que antes ---
  const modal = document.getElementById('modalGaleria');
  const imgModal = document.getElementById('imagenModal');
  document.querySelector('.cerrar-modal').addEventListener('click', cerrarModal);
  window.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
  function abrirModal(src) {
    imgModal.src = src;
    modal.style.display = 'flex';
  }
  function cerrarModal() {
    modal.style.display = 'none';
  }
});








//SECCION CONTACTO
function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  const texto = `Hola, mi nombre es ${nombre}.%0AMi teléfono es: ${telefono}.%0AMi correo es: ${correo}.%0AMensaje:%0A${mensaje}`;
  const numero = "56965527123";
  const url = `https://wa.me/${numero}?text=${texto}`;

  window.open(url, "_blank");
}














// Función para manejar el estado activo del navbar
function setActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  // Detectar la sección visible
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  // Actualizar clase activa
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Manejar clics en los enlaces
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});








document.addEventListener('DOMContentLoaded', () => {
  const categories = [
    {
      categoryTitle: "Vaporizadores Desechables",
      idSuffix: "desechables", // Para IDs únicos de carrusel
      items: [
        {
          name: "SWFT Dual Mesh 30000 Puff Apple Mango Melon",
          price: "$26.000",
          image: "./assets/img/productos/desechables/producto1.png", // Ruta de ejemplo
          description: "Explosión tropical de manzana, mango y melón.",
          specs: {
            sabor: "Mezcla tropical de manzana crujiente, mango jugoso y melón refrescante",
            capacidadLiquido: "24 ml",
            bateria: "800 mAh",
            resistencia: "Dual Mesh Coil para una experiencia de vapeo uniforme",
            puffs: "Hasta 30,000 inhalaciones",
            puertoCarga: "Tipo-C",
            nicotina: "5% (50 mg)",
            pantalla: "LCD para controlar niveles de líquido y batería",
            modosPotencia: "Tres opciones de potencia personalizable"
          }
        },
        {
          name: "IGNITE V50 5000 Puffs Strawberry Kiwi",
          price: "$18.000",
          image: "./assets/img/productos/desechables/producto2.png", // Ruta de ejemplo
          description: "Dulce fresa con un toque exótico de kiwi.",
          specs: {
            sabor: "Fresa y Kiwi",
            capacidadLiquido: "12 ml",
            bateria: "650 mAh",
            puffs: "Hasta 5,000 inhalaciones",
            nicotina: "5% (50 mg)",
            activacion: "Por calada"
          }
        },
        // Agrega más vaporizadores desechables aquí
      ]
    },
    {
      categoryTitle: "Vaporizadores Avanzados",
      idSuffix: "avanzados",
      items: [
        {
          name: "SMOK RPM 5 Pro Kit",
          price: "$46.000",
          image: "./assets/img/productos/avanzados/producto1.png", // Ruta de ejemplo
          description: "Potencia y versatilidad para expertos.",
          specs: {
            potencia: "5-80W",
            bateria: "Externa 18650 (no incluida)",
            capacidadPod: "6.5ml",
            resistencias: "RPM 3 Meshed Coils",
            pantalla: "0.96-inch TFT Display",
            carga: "Tipo-C"
          }
        },
        {
          name: "VAPORESSO Target 100 Mod",
          price: "$52.000",
          image: "./assets/img/productos/avanzados/producto2.png", // Ruta de ejemplo
          description: "Diseño robusto y rendimiento superior.",
          specs: {
            potencia: "5-100W",
            bateria: "Externa 18650/21700 (no incluida)",
            chip: "AXON Chip",
            modos: "VW, Pulse, F(t)",
            pantalla: "0.96” TFT Screen",
            carga: "DC 5V/2A, Type-C"
          }
        },
        // Agrega más vaporizadores avanzados aquí
      ]
    },
    {
      categoryTitle: "Líquidos",
      idSuffix: "liquidos",
      items: [
        {
          name: "Nasty Juice Cush Man Mango 60ml",
          price: "$16.000",
          image: "./assets/img/productos/liquidos/producto1.png", // Ruta de ejemplo
          description: "Sabor intenso a mango maduro y fresco.",
          specs: {
            saborPrincipal: "Mango",
            perfilSabor: "Frutal, Fresco",
            volumen: "60ml",
            proporcionVGPG: "70/30",
            nivelesNicotina: "0mg, 3mg, 6mg"
          }
        },
        {
          name: "Coastal Clouds Salt Nic Mango Berries 30ml",
          price: "$14.000",
          image: "./assets/img/productos/liquidos/producto2.png", // Ruta de ejemplo
          description: "Combinación tropical de mango y bayas.",
          specs: {
            saborPrincipal: "Mango y Bayas",
            tipoNicotina: "Sales de Nicotina",
            volumen: "30ml",
            proporcionVGPG: "50/50",
            nivelesNicotina: "35mg, 50mg"
          }
        },
        // Agrega más líquidos aquí
      ]
    },
    {
      categoryTitle: "Accesorios",
      idSuffix: "accesorios",
      items: [
        {
          name: "Drip Tips Aleader 510 Resina Epóxica (Colores Variados)",
          price: "$5.000", // Ejemplo, actualiza el precio
          image: "./assets/img/productos/accesorios/1.jpeg", // Ejemplo, actualiza la ruta
          description: "Personaliza tu vapeador y mejora tu experiencia con estos drip tips 510 de resina Aleader. ¡Estilo y confort en cada calada!",
          specs: {
            tipo: "Drip Tip 510",
            material: "Resina Epóxica",
            marca: "Aleader",
            compatibilidad: "Atomizadores con boquilla estándar 510",
            diseno: "Patrones variados tipo panal o resina mixta (colores según disponibilidad)"
          }
        },
        {
          name: "Algodón Orgánico Wotofo Xfiber Cotton (30pcs)",
          price: "$7.000", // Ejemplo, actualiza el precio
          image: "./assets/img/productos/accesorios/2.jpeg", // Ejemplo, actualiza la ruta
          description: "Algodón 100% orgánico Wotofo Xfiber, pre-cortado para facilitar tus montajes. Sabor puro y excelente capilaridad.",
          specs: {
            marca: "Wotofo",
            modelo: "Xfiber Cotton",
            material: "100% Algodón Orgánico",
            cantidad: "30 tiras pre-cortadas",
            dimensionesTira: "60mm (largo) x 3mm (diámetro)",
            caracteristicas: "Rápida absorción, sin saborizantes, ideal para RDA/RTA/RDTA"
          }
        },
        {
          name: "Resistencias Pre-fabricadas Wotofo (Variedad N80/N90)",
          price: "$10.000", // Ejemplo, actualiza el precio, puede variar por tipo
          image: "./assets/img/productos/accesorios/3.jpeg", // Ejemplo, actualiza la ruta
          description: "Optimiza tu tiempo con las resistencias pre-armadas de Wotofo. Alto rendimiento y sabor consistente para tus atomizadores reparables. (Consultar tipos disponibles).",
          specs: {
            marca: "Wotofo",
            tipoGeneral: "Resistencias Pre-fabricadas (Prebuilt Coils)",
            materialComun: "Nichrome 80 (N80), Nichrome 90 (N90) - varía según modelo específico",
            presentacion: "Tubo con múltiples unidades (generalmente 5 o 10)",
            usoRecomendado: "Atomizadores reparables (RDA, RTA, RDTA)",
            variedad: "Diversos tipos como Fused Clapton, Framed Staple, etc. (verificar modelo exacto)"
          }
        },
        {
          name: "Algodón Orgánico Dovpo Vipers Cotton (10g)",
          price: "$6.000", // Ejemplo, actualiza el precio
          image: "./assets/img/productos/accesorios/4.jpeg", // Ejemplo, actualiza la ruta
          description: "Algodón premium Dovpo Vipers, 100% orgánico de Arizona, USA. Ofrece una absorción superior y un sabor limpio para una experiencia de vapeo inigualable.",
          specs: {
            marca: "Dovpo",
            modelo: "Vipers Cotton",
            material: "100% Algodón Orgánico (Origen: Arizona, USA)",
            pesoNeto: "10 gramos",
            caracteristicas: "Excelente capilaridad, resistente al calor, sin impurezas"
          }
        },
        {
          name: "Kit de Herramientas para Vapeo Coil Father X6 (o similar)",
          price: "$20.000", // Ejemplo, actualiza el precio
          image: "./assets/img/productos/accesorios/5.jpeg", // Ejemplo, actualiza la ruta
          description: "El kit esencial para todo vaper DIY. Construye, repara y mantén tus atomizadores como un profesional con este completo set de herramientas.",
          specs: {
            nombreKit: "Coil Father X6 (o kit similar de especificaciones equivalentes)",
            contenidoTipico: [
                "Alicate de corte de precisión",
                "Pinzas cerámicas (resistentes al calor)",
                "Pinzas metálicas curvas",
                "Destornillador multi-punta (Phillips, planos)",
                "Tijeras plegables de acero inoxidable",
                "Guía para enrollar resistencias (Coil Jig con varios diámetros)",
                "Cepillo de limpieza para resistencias",
                "Estuche de transporte con cremallera"
            ],
            idealPara: "Construcción y mantenimiento de resistencias y atomizadores reparables"
          }
        },
        {
          name: "Cargador Efest MEGA USB (2 Bahías)",
          price: "$18.000", // Ejemplo, actualiza el precio
          image: "./assets/img/productos/accesorios/6.jpeg", // Ejemplo, actualiza la ruta
          description: "Cargador inteligente Efest MEGA con dos bahías y alimentación USB. Carga tus baterías Li-ion de forma rápida, segura y eficiente.",
          specs: {
            marca: "Efest",
            modelo: "MEGA USB Charger",
            numeroDeBahias: "2 (carga independiente)",
            alimentacion: "Micro USB / USB-C (verificar modelo exacto)",
            compatibilidadBaterias: "Li-ion/IMR: 10440 a 26650 (ej. 18650, 20700, 21700)",
            corrienteDeCarga: "Hasta 1A por bahía (o 2A en una sola, según modelo)",
            indicadores: "Pantalla digital o LEDs para estado de carga y voltaje",
            protecciones: "Sobrecarga, polaridad inversa, cortocircuito, sobrecalentamiento"
          }
        },
        {
          name: "Batería Efest IMR 21700 4000mAh 30A (Unidad)",
          price: "$12.000", // Ejemplo, actualiza el precio por unidad
          image: "./assets/img/productos/accesorios/7.jpeg", // Ejemplo, actualiza la ruta
          description: "Batería Efest IMR 21700 de alto rendimiento. 4000mAh de capacidad y 30A de descarga continua para tus mods más exigentes. (Precio por unidad).",
          specs: {
            marca: "Efest",
            modelo: "IMR 21700 (Purple Series)",
            capacidad: "4000mAh",
            voltajeNominal: "3.7V",
            descargaContinuaMaxima: "30A",
            descargaMaximaPulso: "Consultar especificación del fabricante (ej. 35A-40A)",
            quimica: "IMR (Li-Mn - Litio Manganeso)",
            tipo: "Flat Top (Polo Positivo Plano)",
            certificaciones: "Revisar empaque (CE, RoHS)",
            advertencia: "Usar con conocimiento, no sobrepasar límites de descarga."
          }
        }
        // Puedes agregar más accesorios aquí
      ]
    },
  ];

  const categoryContainer = document.getElementById('category-container');
  const phoneNumber = "56965527123"; // Tu número de WhatsApp

  if (!categoryContainer) {
    console.error("El contenedor de categorías no fue encontrado.");
    return;
  }

  categories.forEach((category, categoryIndex) => {
    const carouselId = `carousel-${category.idSuffix}-${categoryIndex}`;

    let carouselIndicatorsHTML = '';
    let carouselInnerHTML = '';

    category.items.forEach((item, itemIndex) => {
      const activeClass = itemIndex === 0 ? 'active' : '';
      const itemImageUrl = new URL(item.image, window.location.href).href; // Obtiene la URL absoluta

      carouselIndicatorsHTML += `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${itemIndex}" class="${activeClass}" aria-current="${itemIndex === 0 ? 'true' : 'false'}" aria-label="Slide ${itemIndex + 1}"></button>
      `;

      let specsHTML = '';
      if (item.specs) {
        let specItems = '';
        for (const [key, value] of Object.entries(item.specs)) {
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'); // Para camelCase a Título
          specItems += `<li><strong>${label}:</strong> ${value}</li>`;
        }
        specsHTML = `
          <button class="btn btn-link btn-vermas" type="button" data-bs-toggle="collapse" data-bs-target="#specs-${category.idSuffix}-${itemIndex}" aria-expanded="false" aria-controls="specs-${category.idSuffix}-${itemIndex}">
            Especificaciones ▾
          </button>
          <div class="collapse specs-container" id="specs-${category.idSuffix}-${itemIndex}">
            <ul class="specs text-start small ps-3 mb-3">
              ${specItems}
            </ul>
          </div>
        `;
      }
      
      const whatsappMessage = `Hola, me interesa este producto: Categoría: ${category.categoryTitle}, Variedad: ${item.name}, Valor: ${item.price}, Imagen: ${itemImageUrl}`;
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      carouselInnerHTML += `
        <div class="carousel-item ${activeClass}">
          <div class="imgh">
            <img src="${item.image}" class="d-block w-100" alt="${item.name}">
          </div>
          <div class="carousel-item-content">
            <h5 class="carousel-item-title">${item.name}</h5>
            <p class="ctext mb-2">${item.description || ''}</p>
            ${specsHTML}
            <p class="carousel-item-price h5 text-center">${item.price || 'Consultar precio'}</p>
            <div class="text-center mt-2 mb-5">
              <a href="${whatsappLink}" class="btn btn-whatsapp" target="_blank">Lo quiero</a>
            </div>
          </div>
        </div>
      `;
    });

    const categoryCardHTML = `
      <div class="col-12 col-md-6 col-lg-6 d-flex justify-content-center"> <div class="card w-100">
          <div class="card-body p-0"> <h3 class="tituloc pt-3">${category.categoryTitle}</h3>
            <div id="${carouselId}" class="carousel slide" data-bs-ride="false" data-bs-interval="3000"> <div class="carousel-indicators">
                ${carouselIndicatorsHTML}
              </div>
              <div class="carousel-inner">
                ${carouselInnerHTML}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    categoryContainer.insertAdjacentHTML('beforeend', categoryCardHTML);

    // Inicializar colapsables de especificaciones y actualizar texto del botón
    const specToggleButtons = categoryContainer.querySelectorAll(`#${carouselId} .btn-vermas`);
    specToggleButtons.forEach(btn => {
        const collapseElement = document.querySelector(btn.dataset.bsTarget);
        if (collapseElement) {
            collapseElement.addEventListener('show.bs.collapse', () => {
                btn.innerHTML = 'Ver menos ▴';
            });
            collapseElement.addEventListener('hide.bs.collapse', () => {
                btn.innerHTML = 'Especificaciones ▾';
            });
        }
    });

  });

  // Asegúrate de que los carruseles se inicialicen si Bootstrap no lo hace automáticamente.
  // Usualmente, con los atributos data-bs-ride, no es necesario.
  // Pero si quieres controlar cada carrusel explícitamente:
  // document.querySelectorAll('.carousel').forEach(carousel => new bootstrap.Carousel(carousel));
});
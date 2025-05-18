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
      categoryTitle: "Vaporizadores Desechables", // Mantenemos el nombre original
      idSuffix: "desechables",                 // Mantenemos el idSuffix original
      items: [
        {
          name: "Geek Bar Meloso Max 9000 Puff",
          //price: "$23.000", // PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/desechables/1.jpg", // CAMBIAR RUTA DE IMAGEN
          description: "Diseño compacto, boquilla ergonómica y una experiencia de vapeo intensa y duradera. Ideal para comodidad, calidad y frescura.",
          specs: {
            capacidadLiquido: "14ml",
            bateria: "600mAh",
            fuerza: "5%", // O Nicotina: "50mg"
            puffs: "Hasta 9000",
            resistencia: "Mesh",
            puertoDeCarga: "Tipo-C"
          },
          contains: [
            "1x Vaporizador desechable Geek Bar Meloso Max (Sabor según disponibilidad, ej: Watermelon Ice)"
          ]
        },
        {
          name: "SWFT Dual Mesh 30000 Puff",
          //price: "$26.000", // PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/desechables/2.jpg", // CAMBIAR RUTA DE IMAGEN
          description: "Redefine la duración y potencia. 24 ml de líquido, batería de 800mAh recargable y tecnología Dual Mesh Coil para un sabor intenso.",
          specs: {
            capacidadLiquido: "24ml",
            bateria: "800mAh",
            fuerza: "5%", // O Nicotina: "50mg"
            puffs: "Hasta 30000",
            resistencia: "Dual Mesh Coil",
            puertoDeCarga: "Tipo-C"
          },
          contains: [
            "1x Vaporizador desechable SWFT Dual Mesh 30000 Puff"
          ]
        },
        {
          name: "¿Buscas algo más? ¡Pregúntanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", 
          description: "Tenemos un catálogo aún más amplio con diferentes modelos, sabores y accesorios. ¡No dudes en contactarnos para descubrir todo lo que podemos ofrecerte!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        {
          name: "Vaporizador Oxbar Liso 28000 Puffs",
          //price: "$25.000", // PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/desechables/3.jpg", // CAMBIAR RUTA DE IMAGEN
          description: "Innovación y rendimiento en un diseño compacto. Flujo de aire ajustable e indicador de batería para una experiencia segura y con estilo.",
          specs: {
            capacidad: "20 ml",
            puffs: "Hasta 28000",
            bateria: "650 mAh (interna recargable)",
            recarga: "USB-C",
            flujoDeAire: "Ajustable",
            protecciones: "Sobrecarga y Cortocircuito",
            potenciaNicotina: "5%",
            indicadorBateria: "Sí"
          },
          contains: [
            "1x Vaporizador Oxbar Liso 28000 Puffs"
          ]
        },
        {
          name: "¿Buscas algo más? ¡Pregúntanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", 
          description: "Tenemos un catálogo aún más amplio con diferentes modelos, sabores y accesorios. ¡No dudes en contactarnos para descubrir todo lo que podemos ofrecerte!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // Aquí puedes añadir más vaporizadores desechables si tienes los originales que borraste,
        // o simplemente dejar estos tres.
      ]
    },
    {
      categoryTitle: "Kit Inicial", // <<< RENOMBRADO
      idSuffix: "kit-inicial",      // <<< idSuffix ACTUALIZADO
      items: [
        {
          name: "Smok Vape Pen V2 Kit",
          //price: "$30.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/kit-inicial/1.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Potencia y simplicidad en un diseño todo en uno. Batería de 1600 mAh, vapor denso y sabor puro. Perfecto para vapear sobre la marcha.",
          specs: {
            diseno: "Todo en uno",
            dimensiones: "117.7 mm x 22 mm",
            bateria: "1600 mAh (integrada)",
            potenciaMaxima: "60W", // 'potenciaMaxima' en lugar de 'Max. Potencia de salida'
            salidaVoltaje: "3.0-4.0V", // 'salidaVoltaje' en lugar de 'Rango de salida de voltaje'
            rangoResistencia: "0.14-3.0ohm",
            materialChasis: "Aleación de Zinc", // 'materialChasis' en lugar de 'Construcción de chasis de aleación de zinc'
            llenado: "Superior roscado", // 'llenado' en lugar de 'Tapa de llenado superior roscada'
            resistenciaIncluida: "0.15ohm Mesh (Vape Pen)", // 'resistenciaIncluida' en lugar de 'Resistencia de malla Vape Pen de 0.15ohm'
            flujoDeAire: "Doble ranura ajustable", // 'flujoDeAire' en lugar de 'Anillo de control de flujo de aire de doble ranura'
            proteccionesVarias: "Batería de litio, Detección atomizador, Corte 8s, Cortocircuito, Bajo voltaje", // 'proteccionesVarias'
            puertoDeCarga: "MicroUSB"
          },
          contains: [
            "1x Smok Vape Pen V2",
            "2x Resistencias de malla 0.15ohm",
            "1x Cable USB",
            "1x Manual de usuario"
          ]
        },
        {
          name: "Vaporesso Gen Fit 40",
          //price: "$40.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/kit-inicial/2.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Combinación perfecta de diseño minimalista, ergonomía y rendimiento. Ideal para iniciarse en el vapeo con seguridad y sabor.",
          specs: {
            bateria: "2000 mAh (integrada)",
            entradaCarga: "USB-C", // 'entradaCarga' en lugar de 'Entrada USB C'
            potenciaMaxima: "40W",
            tecnologiaAntifugas: "SSS 2.0", // 'tecnologiaAntifugas' en lugar de 'Tecnología resistente a fugas SSS 2.0'
            pantalla: "OLED 0.42”",
            flujoDeAire: "Ajustable",
            dimensiones: "117.9 mm x 32.25 mm x 22.53 mm",
            tanqueCompatible: "iTank X", // 'tanqueCompatible' en lugar de 'ITank x Vaporesso Gen Fit 40'
            resistenciasCompatibles: "GTX", // 'resistenciasCompatibles' en lugar de 'Resistencias GTX'
            capacidadTanque: "3.5 ml",
            sistemaRecarga: "Superior" // 'sistemaRecarga' en lugar de 'Sistema de recarga superior.'
          },
          contains: [
            "1x Vaporesso Gen Fit 40 Mod",
            "1x iTank X (3.5ml)",
            // "1x Resistencia GTX (preinstalada, ej: 0.6ohm Mesh)", // Especificar si viene con alguna y cuál
            // "1x Resistencia GTX (repuesto, ej: 1.2ohm Regular)",   // Especificar si viene con alguna y cuál
            "1x Cable USB Tipo-C",
            "1x Manual de Usuario",
            "1x Tarjeta de Garantía"
          ]
        },
        {
          name: "¿Buscas algo más? ¡Pregúntanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", 
          description: "Tenemos un catálogo aún más amplio con diferentes modelos, sabores y accesorios. ¡No dudes en contactarnos para descubrir todo lo que podemos ofrecerte!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ... (Smok Vape Pen V2 Kit y Vaporesso Gen Fit 40 ya estarían aquí arriba)
    {
      name: "Vaporesso XROS 4 NANO Kit",
      //price: "$38.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
      image: "./assets/img/productos/kit-inicial/3.jpg", // <<< CAMBIAR RUTA DE IMAGEN
      description: "Combina un diseño moderno y sofisticado con un tamaño portátil. Ideal para el uso diario con una batería duradera de 1350 mAh.",
      specs: {
        dimensiones: "56.5mm x 55.25mm x 20.9mm",
        capacidadBateria: "1350mAh", // 'capacidadBateria' en lugar de 'Capacidad de la batería'
        salida: "Basada en voltaje constante",
        rangoResistenciaSoportado: "0.4ohm, 0.6ohm, 0.8ohm", // 'rangoResistenciaSoportado'
        materialChasis: "Aluminio",
        carga: "Puerto Tipo-C",
        indicadorBateria: "Sí", // 'indicadorBateria' en lugar de 'Indicar de duración de bateria'
        serieResistencias: "XROS Pod",
        sistemaLlenado: "Superior", // 'sistemaLlenado' en lugar de 'Sistema de llenado'
        materialPod: "PCTG", // 'materialPod' en lugar de 'Material de la vaina'
        capacidadPod: "2ml", // 'capacidadPod' en lugar de 'Capacidad'
        conexionPod: "Magnética", // 'conexionPod' en lugar de 'Conexión magnética'
        chipset: "AXON", // 'chipset' en lugar de 'Conjunto de chips AXON'
        flujoDeAire: "Ajustable",
        pantalla: "Sí (Indicador LED probablemente)" // 'pantalla' en lugar de 'Pantalla de visualización.'
      },
      contains: [
        "1x Vaporesso XROS 4 NANO Kit",
        "1x Cartucho XROS de 0.4ohm",
        "1x Cartucho XROS de 0.8ohm",
        "1x Cable Tipo-C",
        "1x Manual de usuario",
        "1x Tarjeta de garantía"
      ]
    },
    {
      name: "Vaporesso XROS 4 MINI KIT",
      //price: "$35.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
      image: "./assets/img/productos/kit-inicial/4.jpg", // <<< CAMBIAR RUTA DE IMAGEN
      description: "Versión compacta y potente del XROS, perfecta para llevar a cualquier parte. Batería de 1000mAh y pod recargable de 3ml.",
      specs: {
        dimensiones: "107.51mm x 24mm x 14.12mm",
        capacidadBateria: "1000mAh",
        salida: "Basada en voltaje constante",
        rangoResistenciaSoportado: "0.4ohm (compatible con otros XROS pods)",
        materialChasis: "Aleación de Aluminio",
        carga: "Puerto USB Tipo-C",
        serieResistencias: "XROS Pod",
        sistemaLlenado: "Superior",
        materialPod: "PCTG",
        capacidadPod: "3ml",
        conexionPod: "Magnética",
        chipset: "AXON",
        flujoDeAire: "Ajustable"
      },
      contains: [
        "1x Vaporesso XROS 4 MINI KIT",
        "1x Cartucho XROS de 0.4ohm",
        "1x Cable USB Tipo-C",
        "1x Manual de usuario",
        "1x Tarjeta de garantía"
      ]
    },
    {
      name: "¿Buscas algo más? ¡Pregúntanos!",
      price: "Consultar",
      image: "./assets/img/mas.png", 
      description: "Tenemos un catálogo aún más amplio con diferentes modelos, sabores y accesorios. ¡No dudes en contactarnos para descubrir todo lo que podemos ofrecerte!",
      specs: {},
      contains: [],
      itemType: "consulta"
    },
    {
      name: "Vaporesso Luxe XR MAX Pod Kit",
      //price: "$45.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
      image: "./assets/img/productos/kit-inicial/5.jpg", // <<< CAMBIAR RUTA DE IMAGEN
      description: "Nuevo pod kit diseñado para una experiencia de vapeo DTL satisfactoria. Batería de 2800 mAh y capacidad de 5 ml para disfrutar todo el día.",
      specs: {
        chipset: "AXON",
        dimensiones: "106.5mm x 32.1mm x 26mm",
        bateria: "2800mAh",
        potenciaMaxima: "80W",
        materialChasis: "Aleación de Zinc",
        pantalla: "OLED de 0.54″",
        modoInteligente: "Sí (SMART Mode)", // 'modoInteligente'
        luzIndicadora: "LED", // 'luzIndicadora'
        capacidadPod: "5ml",
        rellenoPod: "Inferior", // 'rellenoPod'
        compatibilidadCoils: "GTX Coil", // 'compatibilidadCoils'
        tecnologiaAntifugas: "SSS Leak-Resistant Technology",
        mejoraSabor: "Corex Flavor Boosting", // 'mejoraSabor'
        compatibilidadPodsAdicionales: "LUXE Pod Series", // 'compatibilidadPodsAdicionales'
        puertoDeCarga: "Tipo-C"
      },
      contains: [
        "1x Vaporesso Luxe XR MAX",
        "1x Cartucho LUXE XR (DTL)",
        "1x Resistencia GTX 0.2ohm Mesh",
        "1x Resistencia GTX 0.4ohm Mesh",
        "1x Cable USB Tipo-C", // Corregido de "microUSB tipo C" a solo "Tipo-C" que es lo usual
        "1x Manual de usuario",
        "1x Tarjeta de garantía"
      ]
    }
      ]
    },
    {
      categoryTitle: "Vaporizadores Avanzados",
      idSuffix: "avanzados",
      items: [
        {
          name: "Voopoo Drag 5 Kit 177W",
          //price: "$65.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/avanzados/1.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Combina diseño elegante y construcción robusta. Potencia ajustable hasta 177W y múltiples modos de vapeo. (No incluye baterías 2x18650).",
          specs: {
            chipset: "GENE.TT",
            dimensiones: "142.4mm x 55.09mm x 27.4mm", // Ajustado para incluir altura total aproximada
            bateriaRequerida: "2x 18650 (No incluidas)", // 'bateriaRequerida' en lugar de 'Batería individual de alto amperaje 18650'
            rangoPotencia: "5-177W", // 'rangoPotencia' en lugar de 'Rango de salida de potencia'
            rangoVoltaje: "Hasta 8.4V", // 'rangoVoltaje'
            rangoResistenciaSoportado: "0.15ohm - 0.3ohm (con PnP-X)", // 'rangoResistenciaSoportado'
            materialChasis: "Aleación de Zinc + Cuero",
            pantalla: "A Color TFT", // 'pantalla'
            capacidadTanque: "5.5ml (PnP-X Pod)", // 'capacidadTanque'
            resistenciasCompatibles: "Serie PnP-X (Todas)",
            puertoDeCarga: "USB Tipo-C"
          },
          contains: [
            "1x Voopoo Drag 5 Mod",
            "1x PnP-X Pod (5.5ml)", // Asumiendo que el kit incluye el pod
            "1x Resistencia 0.15ohm PnP-X",
            "1x Resistencia 0.3ohm PnP-X",
            "1x Cable Tipo-C",
            "1x Manual de usuario",
            "1x Tarjeta de garantía",
            "1x Tarjeta chip GENE"
          ]
        },
        {
          name: "Vaporesso GEN MAX Kit",
          //price: "$70.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/avanzados/2.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Diseño ergonómico y robusto con acabado suave. Rueda de ajuste, potencia máxima de 220W y carga rápida USB-C. (No incluye baterías 2x18650).",
          specs: {
            dimensiones: "141.4mm x 49.7mm x 28.5mm",
            rangoPotencia: "5-220W",
            rangoResistenciaSoportado: "0.03-5.0ohm",
            bateriaRequerida: "2x 18650 (No incluidas)",
            materialChasis: "Aleación de Zinc (con recubrimiento)",
            pantalla: "0.96” TFT Screen & Luz LED",
            controlesAdicionales: "Rueda de ajuste, Botón de modo, Botón de bloqueo central", // 'controlesAdicionales'
            conexionAtomizador: "Rosca 510", // 'conexionAtomizador'
            puertoDeCarga: "USB Tipo-C (Carga rápida)",
            capacidadTanque: "6ml (iTank T)"
          },
          contains: [
            "1x Vaporesso Gen Max Mod",
            "1x Atomizador Vaporesso iTank T (6ml)",
            "1x Resistencia de malla GTi 0.2ohm",
            "1x Resistencia de malla GTi 0.4ohm",
            "1x Pyrex de repuesto",
            "2x Juntas tóricas (O-rings)",
            "1x Cable USB Tipo-C",
            "1x Manual de usuario",
            "1x Tarjeta de garantía"
          ]
        },
        {
          name: "Vaporesso ARMOUR MAX Kit",
          //price: "$75.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/avanzados/3.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Diseño robusto y duradero, perfecto para llevarlo a cualquier parte. Admite baterías 21700 o 18650 para una gran autonomía. (No incluye baterías).",
          specs: {
            dimensiones: "157mm x 56.5mm x 34mm",
            bateriaRequerida: "2x 21700 o 2x 18650 (con adaptador, No incluidas)",
            rangoPotencia: "5-220W",
            modosOperativos: "Potencia, F(t), Pulso, ECO, TC",
            pantalla: "Pantalla TFT de 0.96″",
            materialChasis: "Aleación de Zinc (reforzado)",
            diametroAtomizadorCompatible: "Hasta 25.5mm (para iTank 2)", // 'diametroAtomizadorCompatible'
            chipset: "AXON",
            mecanismoBateria: "Uni-Lock (Bahía inferior)", // 'mecanismoBateria'
            capacidadTanque: "Depende del iTank 2 (usualmente 8ml)", // Asumiendo iTank 2
            resistenciasCompatibles: "Serie GTi"
          },
          contains: [
            "1x Vaporesso ARMOUR MAX Mod",
            "1x Atomizador Vaporesso iTank 2",
            "1x Resistencia de malla GTi 0.2ohm (60-75W)",
            "1x Resistencia de malla GTi 0.4ohm (50-60W)",
            "1x Pyrex de repuesto",
            "2x Juntas tóricas (O-rings)",
            "2x Funda adaptadora de batería 18650",
            "1x Cable Tipo-C",
            "1x Manual de usuario",
            "1x Tarjeta de garantía"
          ]
        }
      ]
    },
    {
      categoryTitle: "Atomizadores",
      idSuffix: "atomizadores", // Nuevo y único idSuffix
      items: [
        {
          name: "Atomizador GeekVape Zeus Subohm 5ml",
          //price: "$32.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/atomizadores/1.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "La última evolución del icónico Zeus. Resistencias de malla Kanthal para vapor potente y sabor puro, con diseño a prueba de fugas.",
          specs: {
            diametro: "26mm",
            capacidadLiquido: "5ml (con pyrex bulb)",
            capacidadRepuesto: "3.5ml (con pyrex estándar)",
            material: "Acero Inoxidable 304",
            sistemaLlenado: "Superior roscado (puertos dobles)",
            flujoDeAire: "Superior ajustable",
            serieResistencias: "Geek Vape ZEUS MeshZ",
            resistenciaIncluida1: "Mesh Z1 0.4ohm (60-70W)",
            resistenciaIncluida2: "Mesh Z2 0.2ohm (70-80W)",
            instalacionResistencia: "Plug and Play",
            boquilla: "Drip Tip 810", // 'boquilla' en lugar de 'Boquilla 810'
            conexion: "Rosca 510" // 'conexion' en lugar de 'Hilo 510'
          },
          contains: [
            "1x Tanque Zeus Sub-ohm",
            "1x Llave para cambio de resistencia",
            "1x Pyrex de repuesto 3.5ml",
            "1x Resistencia Mesh Z1 0.4ohm",
            "1x Resistencia Mesh Z2 0.2ohm",
            "1x Tarjeta promocional",
            "1x Tarjeta de garantía",
            "1x Paquete de repuestos (O-rings, etc.)",
            "1x Manual de usuario"
          ]
        },
        {
          name: "Atomizador Oumier Wasp Nano Pro RDA",
          //price: "$20.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/atomizadores/2.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Versión mejorada del popular Wasp Nano RDA. Diseño optimizado, compacto y portátil, con flujo de aire ajustable para experiencias diversificadas.",
          specs: {
            diametro: "23.5mm",
            material: "Acero Inoxidable Superior",
            configuracionResistencia: "Single Coil", // 'configuracionResistencia'
            aislador: "PEEK",
            flujoDeAire: "Ajustable 360 grados",
            boquilla: "Drip Tip 810 (tapa superior integrada)",
            conexion: "Rosca BF 510 (Pin BF incluido)"
          },
          contains: [
            "1x Oumier Wasp Nano PRO RDA",
            "3x Anillos de silicona",
            "1x Resistencia prefabricada 0.28ohm",
            "2x Tornillos ranurados de repuesto",
            "2x Tornillos Phillips de repuesto",
            "1x Destornillador",
            "1x Plantilla para resistencias (Coil Jig)",
            "1x Pin BF (Bottom Feeder)",
            "1x Drip tip adicional (si aplica, verificar)",
            "1x Manual de usuario"
          ]
        },
        // Ítem Comodín después de dos productos
        {
          name: "¿Buscas algo más en Atomizadores? ¡Pregúntanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< CREAR IMAGEN ESPECÍFICA O USAR GENÉRICA
          description: "Explora nuestra amplia gama de RDAs, RTAs, Sub-Ohm y más. ¡Contáctanos para encontrar el atomizador perfecto para ti!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        {
          name: "Atomizador GeekVape Zeus X RTA",
          //price: "$35.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/atomizadores/3.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Lleva la serie Zeus a nuevas alturas con su diseño sin postes elevado y dinámico flujo de aire superior para optimizar vapor y sabor.",
          specs: {
            diametro: "25mm",
            capacidadLiquido: "4ml", // 'capacidadLiquido'
            material: "Acero Inoxidable",
            plataformaArmado: "Sin postes elevada (Postless)", // 'plataformaArmado'
            configuracionResistencia: "Single o Dual Coil",
            tecnologiaAntifugas: "Sí (Diseño a prueba de fugas)", // 'tecnologiaAntifugas'
            flujoDeAire: "Superior 3D (dirigido hacia abajo)"
          },
          contains: [
            "1x Atomizador Zeus X RTA",
            "2x Resistencias Clapton de 0.4ohm",
            "1x Llave Allen",
            "1x Vidrio Pyrex de repuesto (forma recta o bulb según versión)",
            "1x Drip Tip 810 adicional (usualmente)",
            "1x Adaptador Drip Tip 510 (usualmente)",
            "1x Paquete de repuestos (O-rings, tornillos)",
            "1x Manual de usuario"
          ]
        },
        {
          name: "Hellvape Dead Rabbit 3 RTA 2024 Edition",
          //price: "$38.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/atomizadores/4.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "Versión mejorada del popular Dead Rabbit V3. Capacidad de 5.5ml, plataforma sin postes y control de flujo de aire de arriba a abajo personalizable.",
          specs: {
            diametro: "25mm",
            capacidadBulb: "5.5ml", // 'capacidadBulb'
            capacidadRecto: "3.5ml", // 'capacidadRecto'
            flujoDeAire: "Superior ajustable (de arriba a abajo)",
            sistemaLlenado: "Superior",
            configuracionResistencia: "Single o Dual Coil",
            material: "Acero Inoxidable",
            aislador: "PEEK Positivo",
            boquilla: "Drip Tip Widebore 810"
          },
          contains: [
            "1x Hellvape Dead Rabbit 3 RTA 2024 Edition",
            "2x Resistencias Clapton Ni80 de 0.37ohm",
            "2x Cordones de algodón (Shoelace Cotton)",
            "1x Herramienta para corte de resistencia",
            "1x Bolsa de Extras (O-rings, tornillos)",
            "1x Pyrex de repuesto (3.5ml o según indique el empaque)",
            "1x Manual de usuario"
          ]
        },
        // Ítem Comodín después de otros dos productos
        {
          name: "¿Más opciones de Atomizadores? ¡Consúltanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< MISMA IMAGEN O UNA DIFERENTE
          description: "Tenemos más modelos y marcas de atomizadores esperándote. ¡Escríbenos y te asesoramos!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        {
          name: "Hellvape Dead Rabbit V3 RDA",
          //price: "$30.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/atomizadores/5.jpg", // <<< CAMBIAR RUTA DE IMAGEN
          description: "La nueva versión del exitoso Dead Rabbit RDA, con un deck renovado de 4 postes cilíndricos para mejorar la circulación del vapor y potenciar el sabor.",
          specs: {
            tipo: "RDA (Atomizador de Dripeo Reparable)",
            configuracionResistencia: "Dual Coil",
            deck: "4 Postes cilíndricos mejorados", // 'deck'
            flujoDeAire: "Lateral ajustable (Honeycomb y Slotted)",
            piscinaLiquido: "5mm de profundidad", // 'piscinaLiquido'
            pinBF: "Sí, mejorado para drenaje eficiente", // 'pinBF'
            material: "Acero Inoxidable"
          },
          contains: [
            "1x Dead Rabbit 3 RDA",
            "1x Pin BF (Bottom Feeder)",
            "2x Resistencias Ni80 Fused Clapton Coil de 0.37ohm", // Asumiendo que incluye 2
            "1x Bolsa de recambios (O-rings, tornillos)",
            "1x Bolsa de herramientas (Destornilladores, llave Allen)",
            "1x Cordón de algodón (Shoelace cotton, usualmente)",
            "1x Manual de usuario"
          ]
        }
        // Si tienes un sexto atomizador, lo añades aquí.
        // Si no, el último ítem comodín iría después de este si quieres mantener la pauta de cada dos.
        // Si solo son 5 atomizadores, puedes decidir si pones el ítem comodín al final o no.
        // Para este ejemplo, con 5 atomizadores, el ítem comodín anterior ya cubre bien.
      ]
    },
    {
      categoryTitle: "Líquidos",
      idSuffix: "liquidos", // Mantenemos el idSuffix que ya tenías
      items: [
        // ITEM 1: Basado en 1.jpg (Monster Vape Labs - Fruit Monster / Jam Monster CBD)
        // Nota: Los líquidos CBD pueden tener regulaciones diferentes. Asegúrate de cumplir con ellas.
        // Crearé una entrada genérica para "Monster Vape Labs" invitando a consultar.
        {
          name: "Monster Vape Labs E-Liquids (Fruit/Jam Monster)",
         // price: "$18.000", // <<< PRECIO DE EJEMPLO, AJUSTAR (puede variar por línea/CBD)
          image: "./assets/img/productos/liquidos/1.jpg", // Usa la imagen 1.jpg
          description: "Descubre la explosión de sabores de Monster Vape Labs, con sus populares líneas Fruit Monster y Jam Monster. Opciones con y sin CBD disponibles. ¡Consulta por tu sabor favorito!",
          specs: {
            marca: "Monster Vape Labs",
            lineasPopulares: "Fruit Monster, Jam Monster, Custard Monster, etc.",
            tipo: "E-líquido para vaporizadores (Base Libre y Sales de Nicotina)",
            opcionesCBD: "Algunas líneas disponibles con CBD (verificar concentración)",
            presentacionComun: "Botellas de 30ml (sales/CBD), 60ml o 100ml (base libre)",
            nivelesNicotina: "Variados (0mg, 3mg, 6mg, 25mg, 35mg, 50mg, etc., según línea)"
          },
          contains: [
            "1x Botella de E-líquido Monster Vape Labs (sabor y tipo según selección)"
          ]
        },
        // ITEM 2: Basado en 2.jpg (Variedad de marcas/líneas - Slushie, Elite Juice, Twist E-Liquids, etc.)
        // Crear una entrada más genérica para "Variedad de Líquidos Importados" o destacar una.
        // Destacaré "Elite Juice" y "Twisted Lollies" como ejemplo.
        {
          name: "Elite Juice & Twisted Lollies E-Liquids",
          //price: "$16.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/2.jpg", // Usa la imagen 2.jpg
          description: "Prueba los intensos sabores de Elite Juice como Lemon Tart, o la dulzura refrescante de Twisted Lollies. ¡Una delicia para tu paladar!",
          specs: {
            marcasDestacadas: "Elite Juice, Twisted Lollies (y otras visibles en la imagen)",
            tipo: "E-líquido para vaporizadores",
            perfilesSaborComunes: "Postres (Elite Juice), Frutales/Dulces (Twisted Lollies)",
            presentacionComun: "Botellas Chubby Gorilla (30ml, 60ml, 100ml, 120ml)",
            nivelesNicotina: "Generalmente 0mg, 3mg, 6mg para base libre"
          },
          contains: [
            "1x Botella de E-líquido (marca y sabor según selección)"
          ]
        },
        // Ítem Comodín después de dos productos
        {
          name: "¿Qué sabor de líquido buscas hoy?",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< CREAR IMAGEN ESPECÍFICA O USAR GENÉRICA
          description: "Frutales, mentolados, postres, tabaquiles... ¡Tenemos una amplia selección de líquidos nacionales e importados! Contáctanos.",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 3: Basado en 3.jpg (BLVK Frost - Sales de Nicotina)
        {
          name: "BLVK Frost Salt Nic E-Liquids (Varios Sabores)",
         // price: "$15.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/3.jpg", // Usa la imagen 3.jpg
          description: "Experimenta la frescura intensa de la línea Frost de BLVK Unicorn en sales de nicotina. Sabores frutales con un toque helado perfecto.",
          specs: {
            marca: "BLVK Unicorn",
            linea: "Frost (Salt Nicotine)",
            tipoNicotina: "Sales de Nicotina",
            saboresComunes: "Pure Mint ICE, Peachy Guava ICE, Passion Guava ICE, Mango Pineapple ICE, Apple Berry ICE, Citrus Lemon ICE",
            presentacion: "Botella de 30ml",
            nivelesNicotina: "Comúnmente 35mg, 50mg",
            proporcionPGVG: "50/50 (típico en sales)"
          },
          contains: [
            "1x Botella de BLVK Frost Salt Nic E-Liquid 30ml (sabor según selección)"
          ]
        },
        // ITEM 4: Basado en 4.jpg (Kings Crest Salt - Sales de Nicotina)
        {
          name: "Kings Crest Salt Nic E-Liquids (Línea Gourmet)",
          //price: "$17.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/4.jpg", // Usa la imagen 4.jpg
          description: "Disfruta de los legendarios sabores gourmet de Kings Crest ahora en sales de nicotina. Perfiles complejos y deliciosos como Don Juan Reserve.",
          specs: {
            marca: "Kings Crest",
            tipoNicotina: "Sales de Nicotina",
            saboresIconicos: "Don Juan Reserve, Don Juan Cafe, Duchess Reserve, Strawberry Duchess, Churro",
            presentacion: "Botella de 30ml",
            nivelesNicotina: "Comúnmente 25mg, 35mg, 50mg",
            proporcionPGVG: "50/50 (típico en sales)"
          },
          contains: [
            "1x Botella de Kings Crest Salt Nic E-Liquid 30ml (sabor según selección)"
          ]
        },
        // Ítem Comodín después de otros dos productos
        {
          name: "Sales de Nicotina y Base Libre: ¡Más Opciones!",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< OTRA IMAGEN O LA MISMA
          description: "Explora nuestro catálogo completo de sales de nicotina y líquidos de base libre en diversos sabores y concentraciones.",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 5: Basado en 5.jpg (Fruit Monster - Base Libre)
        {
          name: "Fruit Monster E-Liquids (100ml - Base Libre)",
         // price: "$20.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/5.jpg", // Usa la imagen 5.jpg
          description: "Deléitate con las mezclas frutales vibrantes y refrescantes de Fruit Monster. Botellas de 100ml para una experiencia de sabor duradera.",
          specs: {
            marca: "Fruit Monster (de Monster Vape Labs)",
            tipo: "E-líquido Base Libre",
            saboresVisibles: "Strawberry Kiwi Pomegranate, Blueberry Raspberry Lemon, Mango Peach Guava",
            presentacion: "Botella Chubby Gorilla de 100ml",
            nivelesNicotinaComunes: "0mg, 3mg, 6mg",
            proporcionPGVG: "75/25 (típico para alta producción de vapor)"
          },
          contains: [
            "1x Botella de Fruit Monster E-Liquid 100ml (sabor según selección)"
          ]
        },
        // ITEM 6: Basado en 6.jpg (Cream Team - Base Libre)
        {
          name: "Cream Team E-Liquids (100ml - Sabor Helado)",
          //price: "$21.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/6.jpg", // Usa la imagen 6.jpg
          description: "Para los amantes de los postres cremosos, Cream Team ofrece sabores intensos de helado como Neapolitan, Buttercream y Cinnaroll. ¡Pura indulgencia!",
          specs: {
            marca: "Cream Team (colaboración de Jam Monster y Kings Crest)",
            tipo: "E-líquido Base Libre",
            perfilSabor: "Postres cremosos / Helado",
            saboresVisibles: "Neapolitan, Buttercream, Cinnaroll",
            presentacion: "Botella Chubby Gorilla de 100ml",
            nivelesNicotinaComunes: "0mg, 3mg, 6mg",
            proporcionPGVG: "70/30 (común para postres)"
          },
          contains: [
            "1x Botella de Cream Team E-Liquid 100ml (sabor según selección)"
          ]
        },
        // Ítem Comodín después de otros dos productos (o al final si no hay más)
        {
          name: "¿Tu sabor ideal no está aquí? ¡Avísanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", // OTRA IMAGEN
          description: "Siempre estamos actualizando nuestro stock con los mejores líquidos del mercado. ¡Pregunta por disponibilidad!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 7: Basado en 7.jpg (CORE by Dinner Lady - Base Libre)
        {
          name: "CORE by Dinner Lady E-Liquids (120ml)",
          //price: "$22.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/liquidos/7.jpg", // Usa la imagen 7.jpg
          description: "La línea CORE de Dinner Lady te trae sabores icónicos y nuevos favoritos en botellas de 120ml. Calidad británica para un vapeo premium.",
          specs: {
            marca: "Dinner Lady",
            linea: "CORE",
            tipo: "E-líquido Base Libre",
            saboresComunes: "Vanilla Custard, Grape Vine, Honeydew Melonade, Watermelon Chill, Pink Lemonade, Strawberry Apple, Tropic Mango Chill, Vanilla Tobacco (visibles en imagen)",
            presentacion: "Botella Chubby Gorilla de 120ml",
            nivelesNicotinaComunes: "0mg, 3mg, 6mg",
            proporcionPGVG: "70/30 (típico de Dinner Lady)"
          },
          contains: [
            "1x Botella de CORE by Dinner Lady E-Liquid 120ml (sabor según selección)"
          ]
        }
        // Si tienes más líquidos, puedes añadirlos aquí, y luego otro ítem comodín si es necesario.
      ]
    },
    {
      categoryTitle: "Resistencias y Cartuchos", // Título más descriptivo si vendes ambos
      idSuffix: "resistencias", // Nuevo y único idSuffix
      items: [
        // ITEM 1: Basado en 1.jpg (Vaporesso XROS Series Pods - COREX 2.0)
        {
          name: "Vaporesso XROS Series Pods (COREX 2.0)",
          //price: "$10.000", // <<< PRECIO DE EJEMPLO POR PACK DE 2 o 4, AJUSTAR
          image: "./assets/img/productos/resistencias/1.jpg", // Usa la imagen 1.jpg
          description: "Cartuchos de reemplazo XROS Series con tecnología COREX 2.0 para un sabor explosivo y mayor duración. Varios ohmniajes disponibles.",
          specs: {
            marca: "Vaporesso",
            serieCompatible: "XROS ( verificar modelos específicos compatibles: XROS 3, XROS Nano, XROS Pro, etc.)",
            tecnologia: "COREX 2.0 Heating Tech",
            tipo: "Pod/Cartucho con resistencia integrada",
            capacidadPodComun: "2ml o 3ml (según versión del pod)",
            opcionesResistencia: "0.6ohm Mesh, 0.8ohm Mesh, 1.0ohm Mesh, 1.2ohm (visibles en imagen)",
            llenado: "Superior (Top Fill)",
            presentacionPack: "Generalmente 2 o 4 pods por paquete"
          },
          contains: [
            "1x Pack de Vaporesso XROS Series Pods (cantidad y ohmniaje según selección)"
          ]
        },
        // ITEM 2: Basado en 2.jpg (Vaporesso ECO NANO Pods)
        {
          name: "Vaporesso ECO NANO Pods de Reemplazo",
          //price: "$8.000", // <<< PRECIO DE EJEMPLO POR PACK DE 2, AJUSTAR
          image: "./assets/img/productos/resistencias/2.jpg", // Usa la imagen 2.jpg
          description: "Cartuchos de reemplazo para el Vaporesso ECO NANO. Gran capacidad de 6ml y resistencia mesh para un vapeo duradero y sabroso.",
          specs: {
            marca: "Vaporesso",
            dispositivoCompatible: "Vaporesso ECO NANO",
            tipo: "Pod/Cartucho con resistencia integrada",
            capacidadPod: "6ml",
            resistenciaIntegrada: "0.8ohm Mesh Pod (también puede haber 1.2ohm)",
            presentacionPack: "Paquete de 2 pods"
          },
          contains: [
            "1x Paquete de 2 Vaporesso ECO NANO Pods (ohmniaje según selección)"
          ]
        },
        // Ítem Comodín después de dos productos
        {
          name: "¿No encuentras tu resistencia o cartucho?",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< CREAR IMAGEN ESPECÍFICA O USAR GENÉRICA
          description: "Tenemos una amplia variedad de resistencias y cartuchos para diferentes marcas y modelos. ¡Contáctanos!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 3: Basado en 3.jpg (Vaporesso GTX Coils)
        {
          name: "Vaporesso GTX Mesh Coils (Pack de 5)",
          //price: "$15.000", // <<< PRECIO DE EJEMPLO POR PACK DE 5, AJUSTAR
          image: "./assets/img/productos/resistencias/3.jpg", // Usa la imagen 3.jpg
          description: "Resistencias Vaporesso GTX Mesh para una producción de vapor y sabor excepcionales. Compatibles con una amplia gama de dispositivos Vaporesso.",
          specs: {
            marca: "Vaporesso",
            serieResistencias: "GTX Mesh Coil",
            opcionesComunes: "0.2ohm Mesh (45-60W), 0.3ohm Mesh (32-45W), y muchas otras (0.15, 0.4, 0.6, 0.8, 1.2ohm, Regular)",
            compatibilidad: "Amplia (Target PM80, Gen Nano, Luxe PM40, Swag PX80, XIRON, GTX GO, etc. - Verificar lista completa)",
            presentacionPack: "Paquete de 5 resistencias"
          },
          contains: [
            "1x Paquete de 5 Resistencias Vaporesso GTX Mesh (ohmniaje según selección)"
          ]
        },
        // ITEM 4: Basado en 4.jpg (Vaporesso GTi Coils)
        {
          name: "Vaporesso GTi Mesh Coils (Pack de 5)",
          //price: "$16.000", // <<< PRECIO DE EJEMPLO POR PACK DE 5, AJUSTAR
          image: "./assets/img/productos/resistencias/4.jpg", // Usa la imagen 4.jpg
          description: "Resistencias Vaporesso GTi Mesh diseñadas para la plataforma iTank, ofreciendo un sabor denso y nubes masivas. Ideales para vapeo DTL.",
          specs: {
            marca: "Vaporesso",
            serieResistencias: "GTi Mesh Coil",
            opcionesVisibles: "0.2ohm Mesh (60-75W), 0.4ohm Mesh (50-60W)",
            otrasOpcionesComunes: "0.15ohm Mesh (75-90W), 0.5ohm Mesh (30-40W)",
            compatibilidadPrincipal: "Vaporesso iTank, Target 100, Target 200, Gen 200, Gen 80S, Armour Max, etc.",
            presentacionPack: "Paquete de 5 resistencias"
          },
          contains: [
            "1x Paquete de 5 Resistencias Vaporesso GTi Mesh (ohmniaje según selección)"
          ]
        },
        // Ítem Comodín después de otros dos productos
        {
          name: "¿Necesitas ayuda para elegir tu resistencia?",
          //price: "Consultar",
          image: "./assets/img/mas.png", // <<< OTRA IMAGEN O LA MISMA
          description: "Dinos qué equipo tienes y te ayudaremos a encontrar la resistencia o cartucho compatible perfecto para ti.",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 5: Basado en 5.jpg (Voopoo PnP-X Coils)
        {
          name: "Voopoo PnP-X Coils (Pack de 5)",
          //price: "$17.000", // <<< PRECIO DE EJEMPLO POR PACK DE 5, AJUSTAR
          image: "./assets/img/productos/resistencias/5.jpg", // Usa la imagen 5.jpg
          description: "Resistencias Voopoo PnP-X, la nueva plataforma mejorada de las populares PnP. Mayor durabilidad y un sabor optimizado. Varios ohmniajes disponibles.",
          specs: {
            marca: "Voopoo",
            serieResistencias: "PnP-X Platform Coil",
            opcionesComunes: "0.15ohm (Max 80W), 0.2ohm (Max 60W), 0.3ohm (Max 40W), 0.6ohm (Max 23W)", // Basado en potencias de las cajas
            compatibilidad: "Kits con Pods PnP-X (Drag S/X PnP-X Kit, Argus PnP-X, etc.)",
            presentacionPack: "Paquete de 5 resistencias"
          },
          contains: [
            "1x Paquete de 5 Resistencias Voopoo PnP-X (ohmniaje según selección)"
          ]
        }
        // Si tienes más resistencias o cartuchos, puedes añadirlos aquí.
        // El ítem comodín anterior ya cubre este último producto si no añades más.
      ]
    },
    {
      categoryTitle: "Accesorios",
      idSuffix: "accesorios",
      items: [
        // ITEM 1: Drip Tips (basado en 1.jpeg)
        {
          name: "Drip Tips Aleader 510 Resina Epóxica (Colores Variados)",
         // price: "$5.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/1.jpeg",
          description: "Dale un toque único y personal a tu atomizador con estos drip tips de resina epóxica Aleader. Conexión 510 y vibrantes diseños tipo panal.",
          specs: {
            marca: "Aleader",
            tipoConexion: "510",
            material: "Resina Epóxica",
            diseno: "Estilo panal de abeja (Honeycomb) / Colores y patrones variados",
            compatibilidad: "Atomizadores con boquilla estándar 510"
          },
          contains: [
            "1x Drip Tip Aleader 510 Resina Epóxica (Color/diseño según disponibilidad)"
          ]
        },
        // ITEM 2: Algodón Wotofo Xfiber (basado en 2.jpeg)
        {
          name: "Algodón Orgánico Wotofo Xfiber Cotton (30pcs)",
          //price: "$7.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/2.jpeg",
          description: "Algodón 100% orgánico de Wotofo, pre-cortado en tiras de 60mm x 3mm para un montaje fácil y rápido. Sabor puro y excelente absorción.",
          specs: {
            marca: "Wotofo",
            modelo: "Xfiber Cotton",
            material: "100% Algodón Orgánico",
            formato: "Tiras pre-cortadas con punta aglet",
            cantidad: "30 piezas",
            dimensionesTira: "60mm (largo) x 3mm (diámetro aproximado)",
            idealPara: "RDA, RTA, RDTA (atomizadores reparables)"
          },
          contains: [
            "1x Paquete de Algodón Wotofo Xfiber Cotton (30 tiras)"
          ]
        },
        // ÍTEM 3: Resistencias Pre-fabricadas Wotofo (basado en 3.jpeg)
        // Este producto puede requerir múltiples entradas si vendes diferentes tipos específicos.
        // Aquí crearé una entrada genérica.
        {
          name: "Resistencias Pre-fabricadas Wotofo (Varias Opciones)",
          //price: "$10.000", // <<< PRECIO DE EJEMPLO, AJUSTAR (puede variar por tipo)
          image: "./assets/img/productos/accesorios/3.jpeg",
          description: "Ahorra tiempo con las resistencias pre-armadas de Wotofo. Calidad premium para un rendimiento óptimo. Consulta por tipos y ohmniajes disponibles.",
          specs: {
            marca: "Wotofo",
            tipo: "Resistencias Pre-fabricadas (Prebuilt Coils)",
            materialesComunes: "Ni80, Ni90, Kanthal A1 (varía según modelo)",
            presentacion: "Tubo con varias unidades (ej. 5 o 10 piezas)",
            uso: "Atomizadores reparables (RDA, RTA, RDTA)",
            modelosDisponibles: "Consultar (Ej: Fused Clapton, Alien Clapton, Juggernaut, etc.)"
          },
          contains: [
            "1x Tubo de Resistencias Pre-fabricadas Wotofo (cantidad y tipo según selección)"
          ]
        },
        // ÍTEM 4: Algodón Dovpo Vipers Cotton (basado en 4.jpeg)
        {
          name: "Algodón Orgánico Dovpo Vipers Cotton (10g)",
         // price: "$6.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/4.jpeg",
          description: "Algodón 100% orgánico de Arizona, USA, por Dovpo. Diseñado para una capilaridad superior y un sabor limpio en cada calada. Paquete de 10g.",
          specs: {
            marca: "Dovpo",
            modelo: "Vipers Cotton",
            material: "100% Algodón Orgánico",
            origen: "Arizona, Estados Unidos",
            pesoNeto: "10 gramos",
            caracteristicas: "Alta absorción, resistente al calor, sin impurezas, fácil de separar"
          },
          contains: [
            "1x Bolsa de Algodón Orgánico Dovpo Vipers Cotton (10g)"
          ]
        },
        // Ítem Comodín después de cuatro productos (si lo deseas)
        {
          name: "¿Más Accesorios? ¡Tenemos lo que necesitas!",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< CREAR IMAGEN ESPECÍFICA O USAR GENÉRICA
          description: "Alambres, herramientas, estuches y mucho más. ¡Pregúntanos por el accesorio que estás buscando!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 5: Kit de Herramientas (basado en 5.jpeg)
        {
          name: "Kit de Herramientas para Vapeo (Coil Father X6 o similar)",
          //price: "$20.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/5.jpeg",
          description: "El set completo de herramientas esenciales para los entusiastas del vapeo DIY. Ideal para construir y mantener tus resistencias y atomizadores.",
          specs: {
            tipoKit: "Herramientas para resistencias (Coil Building Toolkit)",
            marcaModeloReferencia: "Coil Father X6 (o kit de prestaciones similares)",
            idealPara: "Construcción de coils, mantenimiento de RDA/RTA/RDTA",
            presentacion: "Estuche de transporte con cremallera"
          },
          contains: [
            "1x Alicate de corte de precisión",
            "1x Pinzas cerámicas (punta fina, resistentes al calor)",
            "1x Pinzas metálicas (curvas o rectas)",
            "1x Destornillador multi-punta (o juego de destornilladores)",
            "1x Tijeras plegables (acero inoxidable)",
            "1x Guía para enrollar resistencias (Coil Jig con varios diámetros)",
            "1x Cepillo de limpieza para resistencias",
            "1x Rollo de alambre (opcional, puede no incluirse o variar)",
            "1x Estuche de transporte"
            // "1x Ohmetro (algunos kits avanzados lo incluyen, verificar)"
          ]
        },
        // ITEM 6: Cargador Efest (basado en 6.jpeg)
        {
          name: "Cargador Efest MEGA USB (2 Bahías)",
          //price: "$18.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/6.jpeg",
          description: "Cargador inteligente Efest MEGA con dos bahías independientes y alimentación USB. Carga tus baterías Li-ion de forma rápida y segura.",
          specs: {
            marca: "Efest",
            modelo: "MEGA USB Charger",
            numeroBahias: "2 (carga independiente)",
            alimentacion: "Micro USB (cable incluido)",
            bateriasCompatibles: "Li-ion/IMR: 10440, 14500, 16340, 18350, 18500, 18650, 20700, 21700, 26500, 26650",
            corrienteDeCarga: "1A x 2 bahías / 2A x 1 bahía (detección automática)",
            indicadores: "Pantalla LED individual por bahía (estado de carga, voltaje)",
            protecciones: "Sobrecarga, Polaridad Inversa, Cortocircuito, Activación de baterías 0V"
          },
          contains: [
            "1x Cargador Efest MEGA USB",
            "1x Cable Micro USB",
            "1x Manual de Usuario",
            "1x Tarjeta de Garantía"
          ]
        },
        // Ítem Comodín después de otros dos productos
        {
          name: "¿Necesitas algún otro accesorio? ¡Contáctanos!",
          price: "Consultar",
          image: "./assets/img/mas.png", // <<< OTRA IMAGEN O LA MISMA
          description: "Desde pyrex de repuesto hasta fundas y cargadores especializados. ¡Encuentra todo para tu vapeo!",
          specs: {},
          contains: [],
          itemType: "consulta"
        },
        // ITEM 7: Batería Efest (basado en 7.jpeg)
        {
          name: "Batería Efest IMR 21700 4000mAh 30A (Unidad)",
          //price: "$12.000", // <<< PRECIO DE EJEMPLO, AJUSTAR
          image: "./assets/img/productos/accesorios/7.jpeg",
          description: "Batería recargable Efest IMR 21700 de alta capacidad (4000mAh) y alta descarga (30A continuos). Ideal para mods potentes. Precio por unidad.",
          specs: {
            marca: "Efest",
            modelo: "IMR 21700 (Purple Series)",
            tipoQuimica: "IMR (Li-Mn - Litio Manganeso)",
            capacidadNominal: "4000mAh",
            voltajeNominal: "3.7V",
            descargaContinuaMaxima: "30A",
            descargaMaximaPulso: "Consultar especificación del fabricante (ej. 35A-40A)",
            poloPositivo: "Flat Top (Plano)",
            recargable: "Sí",
            advertencia: "Usar con conocimiento de baterías. No sobrepasar límites de descarga."
          },
          contains: [
            "1x Batería Efest IMR 21700 4000mAh 30A"
            // "1x Estuche individual de plástico (algunos vendedores lo incluyen)"
          ]
        }
        // Puedes añadir más accesorios aquí si es necesario.
      ]
    },
  ];

  const categoryContainer = document.getElementById('category-container');
  const phoneNumber = "56965527123";

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
      const itemImageUrl = new URL(item.image, window.location.href).href;

      carouselIndicatorsHTML += `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${itemIndex}" class="${activeClass}" aria-current="${itemIndex === 0 ? 'true' : 'false'}" aria-label="Slide ${itemIndex + 1}"></button>
      `;

      // --- INICIO MODIFICACIÓN PARA ACORDEÓN ---
      const accordionParentId = `accordion-parent-${category.idSuffix}-${itemIndex}`; // ID para el div.accordion
      const specsCollapseId = `specs-item-${category.idSuffix}-${itemIndex}`;
      const containsCollapseId = `contains-item-${category.idSuffix}-${itemIndex}`;

      let specsButtonHTML = '';
      let specsPanelHTML = '';
      if (item.specs && Object.keys(item.specs).length > 0) {
        let specItems = '';
        for (const [key, value] of Object.entries(item.specs)) {
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          specItems += `<li><strong>${label}:</strong> ${value}</li>`;
        }
        specsButtonHTML = `
          <button class="btn btn-vermas btn-accordion-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#${specsCollapseId}" aria-expanded="false" aria-controls="${specsCollapseId}">
            Especificaciones ▾
          </button>`;
        specsPanelHTML = `
          <div class="collapse specs-container" id="${specsCollapseId}" data-bs-parent="#${accordionParentId}">
            <ul class="specs text-start small ps-3 mb-3">
              ${specItems}
            </ul>
          </div>`;
      }

      let containsButtonHTML = '';
      let containsPanelHTML = '';
      if (item.contains && item.contains.length > 0) {
        let containItems = '';
        item.contains.forEach(content => {
          containItems += `<li>${content}</li>`;
        });
        containsButtonHTML = `
          <button class="btn btn-que-contiene btn-accordion-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#${containsCollapseId}" aria-expanded="false" aria-controls="${containsCollapseId}">
            Qué contiene ▾
          </button>`;
        containsPanelHTML = `
          <div class="collapse contains-container" id="${containsCollapseId}" data-bs-parent="#${accordionParentId}">
            <ul class="contains-list text-start small ps-3 mb-3">
              ${containItems}
            </ul>
          </div>`;
      }
      
      let accordionCompleteHTML = '';
      if (specsButtonHTML || containsButtonHTML) {
        accordionCompleteHTML = `
          <div class="accordion-buttons-container">
            ${specsButtonHTML}
            ${containsButtonHTML}
          </div>
          <div class="accordion" id="${accordionParentId}">
            ${specsPanelHTML}
            ${containsPanelHTML}
          </div>`;
      }
      // --- FIN MODIFICACIÓN PARA ACORDEÓN ---
      
      let whatsappMessage = ''; // Declarar la variable fuera del if/else
      let whatsappLinkText = 'Lo quiero'; // Texto por defecto del botón

      if (item.itemType === "consulta") {
        whatsappMessage = `Hola, quisiera consultar por más variedad en la categoría: ${category.categoryTitle}.`;
        // Opcional: podrías cambiar el texto del botón también si lo deseas
        // whatsappLinkText = 'Consultar Variedad'; 
      } else {
        whatsappMessage = `Hola, me interesa este producto: Categoría: ${category.categoryTitle}, Variedad: ${item.name}, Valor: ${item.price}, Imagen: ${itemImageUrl}`;
      }
      
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      carouselInnerHTML += `
        <div class="carousel-item ${activeClass}">
          <div class="imgh">
            <img src="${item.image}" class="d-block w-100" alt="${item.name}">
          </div>
          <div class="carousel-item-content">
            <h5 class="carousel-item-title">${item.name}</h5>
            <p class="ctext mb-2">${item.description || ''}</p>
            ${accordionCompleteHTML}
            <p class="carousel-item-price h5 text-center mt-3">${item.price || 'Consultar precio'}</p>
            <div class="text-center mt-2 mb-5">
              <a href="${whatsappLink}" class="btn btn-whatsapp" target="_blank">${whatsappLinkText}</a>
            </div>
          </div>
        </div>
      `;
    });

    const categoryCardHTML = `
      <div class="col-12 col-md-6 col-lg-6 d-flex justify-content-center">
        <div class="card w-100">
          <div class="card-body p-0">
            <h3 class="tituloc pt-3">${category.categoryTitle}</h3>
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"> 
              <div class="carousel-indicators">
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

    // Ajustar el selector para los botones de acordeón
    const accordionToggleButtons = categoryContainer.querySelectorAll(`#${carouselId} .btn-accordion-toggle`);
    accordionToggleButtons.forEach(btn => {
      const targetSelector = btn.getAttribute('data-bs-target');
      if (targetSelector) {
        const collapseElement = document.querySelector(targetSelector);
        if (collapseElement) {
          const buttonBaseText = btn.textContent.trim().slice(0, -2);
          
          collapseElement.addEventListener('show.bs.collapse', () => {
            btn.innerHTML = `${buttonBaseText} ▴`;
          });
          collapseElement.addEventListener('hide.bs.collapse', () => {
            btn.innerHTML = `${buttonBaseText} ▾`;
          });
        }
      }
    });
  });


  
});








document.addEventListener('DOMContentLoaded', () => {
  // TU CÓDIGO EXISTENTE PARA LAS CATEGORÍAS DE PRODUCTOS VA AQUÍ ARRIBA
  // ...
  // ...

  const marcas = [
    { name: "Jam Monster", imgSrc: "./assets/img/marcas/1.jpg", altText: "Logo Jam Monster" },
    { name: "Fruit Monster", imgSrc: "./assets/img/marcas/2.jpg", altText: "Logo Fruit Monster" },
    { name: "SMOK", imgSrc: "./assets/img/marcas/3.jpg", altText: "Logo SMOK" },
    { name: "CORE by Dinner Lady", imgSrc: "./assets/img/marcas/4.jpg", altText: "Logo CORE by Dinner Lady" },
    { name: "VOOPOO", imgSrc: "./assets/img/marcas/5.jpg", altText: "Logo VOOPOO" },
    { name: "GeekVape", imgSrc: "./assets/img/marcas/6.jpg", altText: "Logo GeekVape" },
    { name: "Heaven & Hell", imgSrc: "./assets/img/marcas/7.jpg", altText: "Logo Heaven & Hell" },
    { name: "Nasty Juice", imgSrc: "./assets/img/marcas/8.jpg", altText: "Logo Nasty Juice" },
    { name: "Vaporesso", imgSrc: "./assets/img/marcas/9.jpg", altText: "Logo Vaporesso" },
    { name: "Kings Crest", imgSrc: "./assets/img/marcas/10.jpg", altText: "Logo Kings Crest" }
  ];

  const marcasContainer = document.getElementById('marcas-logos-container');

  if (marcasContainer) {
    marcas.forEach(marca => {
      const marcaHTML = `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex align-items-stretch mb-4">
            <div class="card marca-card h-100 text-decoration-none">
                <div class="marca-card-img-container">
                    <img src="${marca.imgSrc}" alt="${marca.altText || marca.name}" class="card-img-top marca-logo-img">
                </div>
                <div class="card-body text-center pt-2">
                    <h6 class="card-title marca-nombre">${marca.name}</h6>
                </div>
            </div>
        </div>
      `;
      marcasContainer.insertAdjacentHTML('beforeend', marcaHTML);
    });
  }
});
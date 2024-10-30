export const catAutogestion = 'https://script.google.com/macros/s/AKfycbwRgJdz5Swo1uPi3XvZwS9J5GXseO8zVKNgYy14BaONmPav3wlNlTqiI56i_LVeoPR3/exec';
export const resAutogestion = 'https://script.google.com/macros/s/AKfycbyrel6pHIeAfPQ7ByHfBaQRC1CndpxhISlwOLhC0-nYye1qAsSM3KK1jwQurF6BAxlK/exec';
export const contDescuentos = 'https://script.google.com/macros/s/AKfycbySCALq2dD0KZQ-H2XbxX2ojkEfCYEPf7RDiqRndA74HM6hYFBJpv1gd0I5NjvXyHyYSw/exec';
export const catDescuentos = 'https://script.google.com/macros/s/AKfycbzQvuOxyMUgqiVkOeW-v4PDjukCv8Vjp8WGnZZ9Sv9BOwB7jngGuUqOoP-JQNKVW5XIyA/exec';
export const faqAplicantes = '';
export const jsonNhb = '';


const navbar = document.getElementById('navbar');
const footer = document.getElementById('footer');

let prevScrollPos = window.pageYOffset;
let isScrollingUp = false;



// Crea el script para gtag.js
var script1 = document.createElement('script');
script1.async = true;
script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-7N2R6SSJ07';

// Agrega los scripts al <head>
document.head.appendChild(script1);



document.addEventListener("DOMContentLoaded", () => {




  const contenidoNavbar = `<div class="container">
  <a class="navbar-brand " href="../index.html">
    <img src="https://i.postimg.cc/L5dxHpYL/logo-riders.png" alt="Logo Desktop" class="d-none d-lg-inline logo-desktop img-fluid" style="max-width: 130px;">
    <img src="https://i.postimg.cc/fRchtmGS/logo-rider-reducido.png" alt="Logo Mobile" class="d-lg-none logo-mobile img-fluid" style="max-width: 100px;">
  </a>

  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="navbarOffcanvas">
    <div class="offcanvas-header ps-5">
      <h5 class="offcanvas-title text-white">Menu</h5>
      <button type="button" class="btn-close text-reset btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
    </div>
    <div class="offcanvas-body justify-content-end ps-5">
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item py-2">
        
        <a class="nav-link text-white nav-cat" href="../centro.html">
        <img src="/img/Help.svg" alt="Logo Mobile" class="d-lg-none logo-mobile img-fluid" style="width: 30px;padding-right:5px">  Centro de Autogestión</a>
        </li>
        
        <li class="nav-item py-2">
        <a class="nav-link text-white nav-cat" href="../descuentos.html">
        <img src="/img/Discount.svg" alt="Logo Mobile" class="d-lg-none logo-mobile img-fluid" style="width: 30px;padding-right:5px"> 
        Descuentos</a>
      </li>
      <li class="nav-item py-2">
        <a class="nav-link text-white nav-cat" href="../categorias/riders-nuevos.html">
        <img src="/img/Information.svg" alt="Logo Mobile" class="d-lg-none logo-mobile img-fluid" style="width: 30px;padding-right:5px"> 
        Documentos para aplicar</a>
      </li>
        <li class="nav-item py-2">
          <a class="nav-link text-white nav-cat" href="https://www.repartosya.com.ar/?utm_source=riderhub&utm_medium=own&utm_campaign=navbar">
          <img src="../img/Moto.svg" alt="Logo Mobile" class="d-lg-none logo-mobile img-fluid" style="width: 30px;padding-right:5px"> 
          Registrate Ya</a>
        </li>
      </ul>
    </div>
  </div>
</div>`;

  const contenidoFooter = `<footer class="footer bg-dark text-white py-4">
  <div class="container">
    <div class="row">
     <!-- <div class="col-md-6">
        <h5 class="mb-3">Información de contacto</h5>
        <p>Dirección: 123 Calle Principal, Ciudad</p>
        <p>Teléfono: +1 234 567890</p>
        <p>Email: info@example.com</p>
      </div>
      <div class="col-md-6">
        <h5 class="mb-3"><u>Enlaces útiles</u></h5>
        <ul class="list-unstyled">
          <li><a href="#">Acerca de nosotros</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>-->
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <p style="font-size:12px">&copy; <span id="currentYear"></span> PedidosYa. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
 </footer>`;
 
  footer.innerHTML = contenidoFooter;
  navbar.innerHTML = contenidoNavbar;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      isScrollingUp = true;
      navbar.classList.remove('hidden');
      navbar.classList.add('fixed');
    } else {
      if (isScrollingUp) {
        navbar.classList.add('hidden');
        navbar.classList.remove('fixed');
        isScrollingUp = false;
      }
    }
  
    prevScrollPos = currentScrollPos;
  
    if (window.scrollY ===0) {
      navbar.classList.remove('fixed');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Obtener el elemento del año actual
  var currentYearElement = document.getElementById("currentYear");

  // Verificar si el elemento existe antes de actualizar el contenido
  if (currentYearElement) {
    // Obtener el año actual
    var currentYear = new Date().getFullYear();

    // Actualizar el contenido del elemento con el año actual
    currentYearElement.textContent = currentYear;
  }
});

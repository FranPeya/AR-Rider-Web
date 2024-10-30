import { resAutogestion } from './base.js';

let cardsAmostrar = "";
let filtrado = "";

const contenidoDOM = document.querySelector(".contenido");
const cargandoDOM = document.querySelector("#cargando");
const detalleDOM = document.querySelector("#exampleModal");
const pageName = document.querySelector("#nombrePagina");

document.addEventListener("DOMContentLoaded", () => {
  const obtengoContenido = (resAutogestion) => {
    fetch(resAutogestion)
      .then((response) => response.json())
      .then((data) => {
        if (true) {
          // Filtrar los datos según la categoría
          filtrado = data.filter(
            (p) => p.categoria.toLocaleLowerCase() === pageName.textContent.toLocaleLowerCase()
          );

          // Ordenar los datos filtrados por fecha_edit (asegurarse que el formato sea comparable)
          filtrado.sort((a, b) => {
            const fechaA = new Date(a.fecha_edit);
            const fechaB = new Date(b.fecha_edit);
            return fechaB - fechaA; // Orden descendente (más reciente primero)
          });

          // Generar el HTML de las cards
          filtrado.forEach((contenido) => {
            cardsAmostrar += retornoCardContenido(contenido);
          });

          // Inyectar el contenido en el DOM
          contenidoDOM.innerHTML = cardsAmostrar;
        }
      });
  };
  obtengoContenido(resAutogestion);
});

// Función para generar las cards del accordion
const retornoCardContenido = (contenido) => {
  const { pregunta, id, respuesta, fecha_edit } = contenido;
  let HTMLCard = "";

  // Calcular si la fecha_edit es mayor o igual a hoy menos 10 días
  const fechaEditDate = new Date(fecha_edit);
  const hoyMenosDiezDias = new Date();
  hoyMenosDiezDias.setDate(hoyMenosDiezDias.getDate() - 10);

  // Si la fecha es reciente (>= hoy menos 10 días), agregar el badge "NEW"
  let badgeNew = "";
  if (fechaEditDate >= hoyMenosDiezDias) {
    badgeNew = `<span class="badge bg-success ms-2">NUEVO</span>`;
  }

  // Construir la tarjeta del accordion con el badge si aplica
  HTMLCard += `<div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${id}">
        <button id=${id} class="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapse${id}">
         <p class="m-0 py-2"> ${pregunta}${badgeNew}</p>
        </button>
      </h2>
      <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body"> <p>${respuesta}</p>
          
          </div>
      </div>
    </div>`;
  return HTMLCard;
};

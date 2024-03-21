let cardsAmostrar = "";
let contenidoJSON = [];
let verMas = "";
let detalleJSON = [];


const contenidoDOM = document.querySelector(".contenido");
const cargandoDOM = document.querySelector("#cargando");
const detalleDOM = document.querySelector("#exampleModal");
const pageName = document.querySelector("#nombrePagina");


const URL = `https://script.google.com/macros/s/AKfycbyrel6pHIeAfPQ7ByHfBaQRC1CndpxhISlwOLhC0-nYye1qAsSM3KK1jwQurF6BAxlK/exec`;

document.addEventListener("DOMContentLoaded", () => {
  const obtengoContenido = (URL) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (true) {
          filtrado = data.filter(
       
            (p) => p.categoria === pageName.textContent.toLocaleLowerCase()
          );
          console.log(filtrado);
          filtrado.forEach((contenido) => {
            cardsAmostrar += retornoCardContenido(contenido);
          });
          contenidoDOM.innerHTML = cardsAmostrar;
        } 
        
      });
  };
  obtengoContenido(URL);
});

const retornoCardContenido = (contenido) => {
  const { pregunta, id, respuesta } = contenido;
  let HTMLCard = "";
  HTMLCard += `<div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${id}">
        <button id=${id} class="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapse${id}">
         <p class="m-0 py-2"> ${pregunta}</p>
        </button>
      </h2>
      <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body"> <p>${respuesta}</p>
          
          </div>
      </div>
    </div>`;
  return HTMLCard;
};

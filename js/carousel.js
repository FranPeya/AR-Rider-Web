import { contDescuentos } from './base.js';

let carouselAmostrar = "";
let carouselJSON = [];
let carFiltrada = "";

const carouselDOM = document.querySelector("#carousel");

document.addEventListener("DOMContentLoaded", () => {
    
  const obtengoCarousel = (contDescuentos) => {
    fetch(contDescuentos)
      .then((response) => response.json())
      .then((data) => {
        carFiltrada = data.filter(p => p.banner === true && p.publicar === true);
        carFiltrada.forEach((cont, index) => {
          carouselAmostrar += retornoCarouselContenido(cont, index);
        });
        carouselDOM.innerHTML = carouselAmostrar;
      });
  };
  obtengoCarousel(contDescuentos);
});

const retornoCarouselContenido = (cont, index) => {
  const {
    nombre,
    descripcion,
    logo,
    descuento,
    track_id
  } = cont;
  
  // Verifica si es la primera slide y agrega la clase "active" en consecuencia
  const isActive = index === 0 ? "active" : "";
  
  let HTMLCard = `
    <div class="carousel-item ${isActive}">
      <table style="border-collapse: collapse; color: #fff; width: 100%; padding: 20px 0px"></table>
      <table class="banner">
        <tr style="height: 10px;">
          <th rowspan="2" width="50%" bgcolor="#100423" class="ps-md-5 ps-4 pe-3">
            <img src="${logo}" class="card-img-top rounded-3" alt="...">
          </th>
          <td width="50%" bgcolor="#fa0050">
            <h3 class="titulo fs-lg-1"><b>${nombre}</b></h3>
            <h3 class="px-4 pt-lg-4 fs-lg-2">${descuento}<br></h3>
            <p class="px-4 fs-6 lh-sm pt-lg-4">${descripcion}</p>
          </td>
        </tr>
        <tr style="text-align: center; height: 10%;" bgcolor="#fa0050">
          <td>
            <div>
              <a class="btn banner-boton border border-0 rounded-pill mb-2"  data-bs-toggle="modal" role="button" data-bs-target="#${track_id}Modal">Conoce más</a>
            </div>
          </td>
        </tr>
      </table>
    </div>`;
    
  return HTMLCard;
};

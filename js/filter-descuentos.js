import { catDescuentos,contDescuentos } from './base.js';
import { retornoCardContenido, retornoCardContenidoCta } from './descuentos.js';

let listaAmostrar = "";
let selectionJSON = [];
let listaFiltrada = "";
let filtrado = [];
let filtradoCta = [];
let listaFiltradaCta = "";
let contenidoJSON = [];
let contenidoCtaJSON = [];
let cardsAmostrar = "";
let cardsCtaAmostrar = "";
const contenidoDOM = document.querySelector("#contenido");


const selectionDOM = document.querySelector("#operacionSelection");
const filtroDOM = document.querySelector("#trFiltro");

document.addEventListener("DOMContentLoaded", () => {


  const obtengoCont = (catDescuentos) => {
    fetch(catDescuentos)
      .then((response) => response.json())
      .then((data) => {
        selectionJSON = data;
        selectionJSON.forEach((cont) => {
          listaAmostrar += retornoListaContenido(cont);
        });
        selectionDOM.innerHTML = listaAmostrar;
      });
  };
  obtengoCont(catDescuentos);
});

const retornoListaContenido = (cont) => {
  const { categoriasDisponibles } = cont;
  let HTMLCard = "";
  HTMLCard += `<option value="${categoriasDisponibles}">${categoriasDisponibles}</option>`;
  return HTMLCard;
};


filtroDOM.addEventListener("click", (e) => {
  e.preventDefault();
  listaFiltrada = "";
  contenidoDOM.innerHTML = "";
  contenidoJSON = [];
  contenidoCtaJSON = [];
  filtrado = [];
  filtradoCta = [];
  cardsAmostrar = "";
  cardsCtaAmostrar = "";
  listaFiltradaCta = "";
  const obtengoContenido = (contDescuentos) => {
    fetch(contDescuentos)
      .then((response) => response.json())
      .then((data) => {
        let selection = selectionDOM.value;

        filtrado = data.filter(
          (p) =>
            p.categoria === selection && p.publicar === true && p.CTA != true
        );
        filtradoCta = data.filter(
          (p) =>
            p.categoria === selection && p.publicar === true && p.CTA === true
        );

        contenidoJSON = data.filter(
          (p) => p.publicar === true && p.CTA != true
        );
        contenidoCtaJSON = data.filter(
          (p) => p.publicar === true && p.CTA === true
        );

        if (selection != "Ver todos") {
          filtrado.forEach((contenido) => {
            listaFiltrada += retornoCardContenido(contenido);
          });
          filtradoCta.forEach((contenido) => {
            listaFiltradaCta += retornoCardContenidoCta(contenido);
          });
          contenidoDOM.innerHTML = listaFiltrada + listaFiltradaCta;
        } else if (selection === "Ver todos") {

 
          const contenidoTotal = [...contenidoJSON, ...contenidoCtaJSON];

          // Ordenar el contenido total de mayor a menor según el id
          contenidoTotal.sort((a, b) => b.id - a.id);

          contenidoTotal.forEach((contenido) => {
            if (contenido.CTA === true) {
              cardsAmostrar += retornoCardContenidoCta(contenido);
            } else {
              cardsAmostrar += retornoCardContenido(contenido);
            }
          });

          // Imprimir las tarjetas en el orden deseado
          contenidoDOM.innerHTML = cardsAmostrar;
        }
      });
  };
  obtengoContenido(contDescuentos);
});


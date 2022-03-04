const fila = document.querySelector(".contenedor-carousel");
const peliculas = document.querySelectorAll(".pelicula");


const fila2 = document.querySelector(".contenedor-carousel2");
const peliculas2 = document.querySelectorAll(".pelicula2");

const flechaIzquierda  = document.getElementById("flecha-izquierda");
const flechaDerecha  = document.getElementById("flecha-derecha");

const flechaIzquierda2  = document.getElementById("flecha-izquierda2");
const flechaDerecha2  = document.getElementById("flecha-derecha2");

// -----------Event listener ------------//
 flechaDerecha.addEventListener("click", () => {
     fila.scrollLeft += fila.offsetWidth;

     const indicadorActivo = document.querySelector(".Indicadores .activo");
     if(indicadorActivo.nextSibling){
         indicadorActivo.nextSibling.classList.add("activo");
         indicadorActivo.classList.remove("activo"); 
     }



 });



 // -----------Event listener ------------//
 flechaDerecha2.addEventListener("click", () => {
    fila2.scrollLeft += fila2.offsetWidth;

    const indicadorActivo = document.querySelector(".Indicadores2 .activo");
    if(indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add("activo");
        indicadorActivo.classList.remove("activo"); 
    }



});



// -----------Event listener ------------//
 flechaIzquierda.addEventListener("click", () => {
     fila.scrollLeft -= fila.offsetWidth;

     const indicadorActivo = document.querySelector(".Indicadores .activo");
     if(indicadorActivo.previousSibling){
         indicadorActivo.previousSibling .classList.add("activo");
         indicadorActivo.classList.remove("activo"); 
     }

 });



 // -----------Event listener ------------//
 flechaIzquierda2.addEventListener("click", () => {
    fila2.scrollLeft -= fila2.offsetWidth;

    const indicadorActivo = document.querySelector(".Indicadores2 .activo");
    if(indicadorActivo.previousSibling){
        indicadorActivo.previousSibling .classList.add("activo");
        indicadorActivo.classList.remove("activo"); 
    }

});


 // -----------Paginación ------------//

  const numeroPaginas = Math.ceil(peliculas.length / 2 );
  for(let i = 0; i < numeroPaginas; i++){
      const indicador = document.createElement("Button");

      if(i === 0){
           indicador.classList.add("activo"); 
      }



      document.querySelector(".Indicadores").appendChild(indicador);
      indicador.addEventListener ("click", (e) => {
          fila.scrollLeft = i * fila.offsetWidth;


          document.querySelector(".Indicadores .activo").classList.remove("activo");
          e.target.classList.add("activo");
           
      });
  }





    // -----------HOVER ------------//
peliculas.forEach((pelicula2) => {
    pelicula.addEventListener("mouseenter", (e) => {
         const elemento = e.currentTarget;
         setTimeout(() => {
             peliculas.forEach(pelicula => pelicula.classList.remove("hover"));
             elemento.classList.add("hover");

         }, 300);
    });
});

fila.addEventListener ("mouseleave",() => {
peliculas.forEach(pelicula => pelicula.classList.remove("hover"));

});







// ---------------------------------------------------------------------------------------- //

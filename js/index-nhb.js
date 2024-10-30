import { jsonNhb } from './base.js';


// Supongamos que la URL del JSON es 'data.json'
const bannerElement = document.getElementsByClassName("banner_nhb")[0]; // Seleccionamos el primer elemento con esta clase

// Función para ocultar el banner si origin es "#N/A"
const checkOriginAndHideBanner = () => {
    fetch(jsonNhb)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log('Datos recibidos del JSON:', data); // Para depurar

            // Accedemos al primer objeto en el array
            if (data.length > 0 && data[0].origin === '#N/A') {
                if (bannerElement) {
                    bannerElement.style.display = 'none'; // Ocultamos el elemento
                } else {
                    console.log('Elemento no encontrado con la clase "banner_nhb"');
                }
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
};

// Ejecutamos la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', checkOriginAndHideBanner);
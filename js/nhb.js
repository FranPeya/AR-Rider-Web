// URL del Google Apps Script desplegado que devuelve el JSON con los datos
const sheetUrl = 'https://script.google.com/macros/s/AKfycbz-V9xb0Umy1HvO9ImYl360le32ACDV_6oxjFg6g_Tun-hEP4-G6G2uLg8Nmj27sN3uxQ/exec';

// Función para formatear el valor de duration (ejemplo: P20D => 20 días)
function formatDuration(duration) {
    return duration.replace('P', '').replace('D', ' días');
}

// Función para formatear la fecha a formato dd/mm/yyyy
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Función para crear una tarjeta HTML
function createCard(vehicleFormat, amount, threshold, duration, endDate) {
    return `
        <div class="section-slide-in">
            <h2 class="card-title-nhb">Si repartís en <span class="highlight">${vehicleFormat}</span></h2>
            <div class="amount">
                <span class="currency">$</span>
                <span class="value">${amount}</span>
                <span class="extra">Extras</span>
            </div>
            <p>Para recibir el extra tenés que completar al menos <span class="bold">${threshold} pedidos</span> en tus primeros <span class="bold">${formatDuration(duration)}</span>.</p>
            <p class="disclaimer">Este extra es válido hasta el ${formatDate(endDate)}</p>
        </div>
    `;
}

// Función para actualizar las tarjetas dinámicamente
function updateCards(data, selectedCity) {
    const container = document.getElementById('flyer-container');
    container.innerHTML = ''; // Limpiamos el contenedor

    // Filtramos por ciudad
    const filteredData = data.filter(item => item.city === selectedCity);

    // Iteramos sobre los registros filtrados y generamos tarjetas dinámicas
    filteredData.forEach(item => {
        const cardHTML = createCard(item.vehicle_format, item.amount, item.threshold, item.duration, item.end_date);
        container.insertAdjacentHTML('beforeend', cardHTML); // Insertamos directamente en el contenedor
    });
}

// Función para popular la lista de ciudades en el dropdown
function populateCityDropdown(data) {
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="">-- Selecciona una ciudad --</option>';

    // Extraemos las ciudades sin duplicados
    const uniqueCities = [...new Set(data.map(item => item.city))];

    // Añadimos cada ciudad como opción en el dropdown
    uniqueCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Función para obtener los datos del Apps Script o desde LocalStorage
async function fetchData() {
    try {
        const cachedCities = localStorage.getItem('cities');
        const timestamp = localStorage.getItem('citiesTimestamp');
        const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        // Si los datos están en LocalStorage y no han expirado, los usamos
        if (cachedCities && timestamp && (Date.now() - timestamp < cacheDuration)) {
            const data = JSON.parse(cachedCities);
            console.log("Usando datos de LocalStorage");
            populateCityDropdown(data); // Poblar dropdown con los datos almacenados
            setupDropdownListener(data); // Configurar el event listener para las ciudades
        } else {
            // Si no hay datos en caché o los datos son antiguos, hacemos una solicitud
            console.log("Obteniendo datos desde el servidor");
            const response = await fetch(sheetUrl);
            const data = await response.json();

            // Guardamos los datos en LocalStorage
            localStorage.setItem('cities', JSON.stringify(data));
            localStorage.setItem('citiesTimestamp', Date.now());

            // Poblar dropdown con los datos obtenidos del servidor
            populateCityDropdown(data);
            setupDropdownListener(data); // Configurar el event listener para las ciudades
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para configurar el event listener del dropdown
function setupDropdownListener(data) {
    document.getElementById('city-select').addEventListener('change', function() {
        const selectedCity = this.value;
        if (selectedCity) {
            updateCards(data, selectedCity);
        } else {
            document.getElementById('flyer-container').innerHTML = ''; // Limpiamos si no hay selección
        }
    });
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('inicio-bono-modal');
    modal.style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('inicio-bono-modal');
    modal.style.display = 'none';
}

// Configuración de los botones del modal
function setupModalListeners() {
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    const modalOverlay = document.getElementById('inicio-bono-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); // Llamada inicial para obtener los datos
    setupModalListeners(); // Configuración del modal
});

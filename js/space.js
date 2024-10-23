const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', handleSearch);

function handleSearch() {
  const searchTerm = inputBuscar.value.trim();

  if (searchTerm) {
    fetchImages(searchTerm);
  }
}

async function fetchImages(query) {
  const apiUrl = `https://images-api.nasa.gov/search?q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayImages(data.collection.items);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    contenedor.innerHTML = `
      <p>Hubo un error al obtener los datos. Por favor, intenta nuevamente.</p>
      <p>Detalles del error: ${error.message}</p>`;
  }
}

function displayImages(items) {
  contenedor.innerHTML = ''; // Limpia el contenedor

  if (!items.length) {
    contenedor.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
    return;
  }

  const cards = items.map(item => createCard(item)).join('');
  contenedor.innerHTML = cards; // Inserta todas las tarjetas de una vez
}

function createCard(item) {
  const { data, links } = item;
  const title = data[0].title || 'Sin título';
  const description = data[0].description || 'Sin descripción';
  const date = new Date(data[0].date_created).toLocaleDateString() || 'Fecha no disponible';
  const imageUrl = links?.[0]?.href || 'https://via.placeholder.com/300';

  return `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card">
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-muted">
          ${date}
        </div>
      </div>
    </div>`;
}

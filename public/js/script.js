// Search form element references
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Results container reference
const resultsContainer = document.getElementById('results');

// Loader element reference
const loader = document.getElementById('loader');

// Function to fetch movie data from the API
async function fetchMovies(query, page = 1) {
  const url = `${API_URL}&s=${encodeURIComponent(query)}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Function to display movie results
function displayResults(movies) {
  if (movies.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No results found.';
    resultsContainer.appendChild(message);
    return;
  }

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    resultsContainer.appendChild(movieCard);
  });
}

// Function to create a movie card element
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const img = document.createElement('img');
  img.src = movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.jpg';
  movieCard.appendChild(img);

  const title = document.createElement('h2');
  title.textContent = movie.Title;
  movieCard.appendChild(title);

  const year = document.createElement('p');
  year.textContent = movie.Year;
  movieCard.appendChild(year);

  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'View Details';
  detailsButton.addEventListener('click', () => {
    displayMovieDetails(movie.imdbID);
  });
  movieCard.appendChild(detailsButton);

  return movieCard;
}

// Function to display movie details
function displayMovieDetails(imdbID) {
  const url = `movie-details.html?imdbID=${imdbID}`;
  window.location.href = url;
}

// Event listener for search form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query === '') {
    return;
  }

  resultsContainer.innerHTML = ''; // Clear previous results
  showLoader();
  const movies = await fetchMovies(query);
  hideLoader();
  displayResults(movies);
});

// Infinite scrolling event listener
window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    const query = searchInput.value.trim();
    const currentPage = Math.ceil(resultsContainer.children.length / 10) + 1;
    showLoader();
    const movies = await fetchMovies(query, currentPage);
    hideLoader();
    displayResults(movies);
  }
});

// Function to show the loader
function showLoader() {
  loader.style.display = 'block';
}

// Function to hide the loader
function hideLoader() {
  loader.style.display = 'none';
}

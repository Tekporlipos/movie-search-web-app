// Search form element references
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Results container reference
const resultsContainer = document.getElementById('results');

// Loader element reference
const loader = document.getElementById('loader');



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

// Array of random movie titles
const initialMovieTitles = [
    'Matrix',
    'Inception',
    'Knight',
    'Interstellar',
    'Fiction',
    'Fight',
    'Redemption',
    'Goodfellas',
    'Godfather',
    'Forrest',
    "Batman",
    "Ironman",
    "spiderman",
  ];
  
  // Function to generate a random movie title
  function getRandomMovieTitle() {
    const randomIndex = Math.floor(Math.random() * initialMovieTitles.length);
    return initialMovieTitles[randomIndex];
  }
  
  // Function to load initial movies on page load
  function loadInitialMovies() {
    const initialQuery = getRandomMovieTitle();
    searchInput.value = initialQuery;
    fetchMovies(initialQuery)
      .then((movies) => {
        console.log(movies);
        displayResults(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Execute the loadInitialMovies function when the page has finished loading
  window.addEventListener('load', loadInitialMovies);
  
// Event listener for sorting by option change
const sortBySelect = document.getElementById('sort-by');
sortBySelect.addEventListener('change', () => {
  const selectedSortBy = sortBySelect.value;
  const query = searchInput.value;
  fetchMovies(query, 1, selectedSortBy)
    .then((movies) => {
      resultsContainer.innerHTML = ''; // Clear previous results
let newData = movies;
      switch (sortBySelect.value) {
        case "relevance":
          newData =   movies.sort((v,a)=>a.Poster.length - v.Poster.length);
          break;
          case "title":
            newData =   movies.sort((v,a)=>a.Title.length - v.Title.length);
          break;
          case "year":
            newData =   movies.sort((v,a)=>Number(a.Year) - Number(v.Year));
          break;
        default:
          break;
      }
      displayResults(newData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// Event listener for filtering by type option change
const sortByType = document.getElementById('filter-type');
sortByType.addEventListener('change', () => {
  const selectedSortBy = sortByType.value;
  const query = searchInput.value;
  fetchMovies(query, 1, sortBySelect.value, selectedSortBy)
    .then((movies) => {
      resultsContainer.innerHTML = ''; // Clear previous results
      displayResults(movies);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// Event listener for filter button click
const filterButton = document.getElementById('filter-button');
const filterBar = document.querySelector('.filter-bar');
filterButton.addEventListener('click', () => {
  let display = filterBar.style.display;
  if (display === 'none') {
    filterBar.style.display = 'flex';
  } else {
    filterBar.style.display = 'none';
    sortBySelect.value = 'relevance';
    sortByType.value = 'movie';
  }
});

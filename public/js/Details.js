// Get the IMDb ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// Function to fetch movie details from the API
async function fetchMovieDetails(imdbID) {
  const url = `${API_URL}&i=${imdbID}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Function to display movie details
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details-container');
    movieDetailsContainer.innerHTML = ''; // Clear previous content
  
    const movieDetailsWrapper = document.createElement('div');
    movieDetailsWrapper.classList.add('movie-details-wrapper');
  
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
  
    const poster = document.createElement('img');
    poster.src = movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.jpg';
    poster.alt = movie.Title;
    imageWrapper.appendChild(poster);
  
    const title = document.createElement('h1');
    title.textContent = movie.Title;
  
    const plot = document.createElement('p');
    plot.classList.add('plot');
    plot.textContent = movie.Plot;
  
    const detailsWrapper = document.createElement('div');
    detailsWrapper.classList.add('details-wrapper');
  
    const detailsList = document.createElement('ul');
    detailsList.classList.add('details-list');
  
    // Loop through all the properties of the movie object
    for (const property in movie) {
      if (movie.hasOwnProperty(property) && property !== 'Poster' && property !== 'imdbID' && property !== 'Response' && property != 'Ratings' && property !== 'Plot') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="detail-label">${property}:</span> ${movie[property]}`;
        detailsList.appendChild(listItem);
      }
    }
  
    detailsWrapper.appendChild(title);
    detailsWrapper.appendChild(plot);
    detailsWrapper.appendChild(detailsList);
  
    movieDetailsWrapper.appendChild(imageWrapper);
    movieDetailsWrapper.appendChild(detailsWrapper);
  
    movieDetailsContainer.appendChild(movieDetailsWrapper);
  
    console.log('Movie details:', movie);
  
    // Fetch and display related movies
    fetchRelatedMovies(movie.Title)
      .then((movies) => {
        displayRelatedMovies(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to fetch related movies from the API
  async function fetchRelatedMovies(title) {
    const url = `${API_URL}&s=${encodeURIComponent(title)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.Search;
    } catch (error) {
      throw new Error('Failed to fetch related movies');
    }
  }
  
// Function to display related movies using Glide carousel
function displayRelatedMovies(movies) {
    const relatedMoviesContainer = document.createElement('div');
    relatedMoviesContainer.classList.add('related-movies-container');
  
    const relatedMoviesTitle = document.createElement('h2');
    relatedMoviesTitle.textContent = 'Related Movies';
  
    const moviesList = document.createElement('div');
    moviesList.classList.add('glide');
  
    const glideTrack = document.createElement('div');
    glideTrack.classList.add('glide__track');
    glideTrack.setAttribute('data-glide-el', 'track');
  
    const glideSlides = document.createElement('ul');
    glideSlides.classList.add('glide__slides');
  
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      glideSlides.appendChild(movieCard);
    });
  
    glideTrack.appendChild(glideSlides);
    moviesList.appendChild(glideTrack);
  
    relatedMoviesContainer.appendChild(relatedMoviesTitle);
    relatedMoviesContainer.appendChild(moviesList);
  
    const movieDetailsContainer = document.getElementById('movie-details-container');
    movieDetailsContainer.appendChild(relatedMoviesContainer);
  
    // Initialize Glide carousel
    const glide = new Glide(moviesList, {
      type: 'carousel',
      perView: 4,
      gap: 20,
      breakpoints: {
        800: {
          perView: 2,
        },
        480: {
          perView: 1,
        },
      },
    });
  
    // Adjust Glide carousel height after the images are loaded
    glide.on('mount.after', () => {
      glide.update();
    });
  
    glide.mount();
  }
  
  
  // Function to create a movie card element
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    const img = document.createElement('img');
    img.src = movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.jpg';
    movieCard.appendChild(img);
  
    const title = document.createElement('h3');
    title.textContent = movie.Title;
    movieCard.appendChild(title);
  
    const year = document.createElement('span');
    year.textContent = movie.Year;
    movieCard.appendChild(year);
  
    movieCard.addEventListener('click', () => {
      const imdbID = movie.imdbID;
      window.location.href = `movie-details.html?imdbID=${imdbID}`;
    });
  
    return movieCard;
  }
  
  // Fetch and display the movie details
  fetchMovieDetails(imdbID)
    .then((movie) => {
      if (movie) {
        displayMovieDetails(movie);
      } else {
        console.log('No movie details found.');
      }
    });

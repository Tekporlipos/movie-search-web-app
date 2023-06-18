// Get the IMDb ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// Function to display movie details
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details-container');
    movieDetailsContainer.innerHTML = ''; // Clear previous content
  
    const movieDetailsWrapper = document.createElement('div');
    movieDetailsWrapper.classList.add('movie-details-wrapper');
  
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
  
    const poster = document.createElement('img');
    poster.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/seed/picsum/200/300';
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
  // Fetch and display the movie details
  fetchMovieDetails(imdbID)
    .then((movie) => {
      if (movie) {
        displayMovieDetails(movie);
      } else {
        console.log('No movie details found.');
      }
    });

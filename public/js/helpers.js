    // Function to create a movie card element
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    const img = document.createElement('img');
    img.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/200/300?grayscale';
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

  // Function to redirect display movie details
function displayMovieDetails(imdbID) {
    const url = `movie-details.html?imdbID=${imdbID}`;
    window.location.href = url;
  }
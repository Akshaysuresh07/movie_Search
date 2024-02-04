const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";



async function Movies() {
    try {
        const response = await fetch(APILINK);
        const data = await response.json();
        console.log(data);

        const movieResults = document.getElementById('movieResults');
        movieResults.innerHTML = ' ';

        if (data.results) {
            data.results.slice(0, 15).forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                <div class="m-5 w-60 overflow-hidden transition-transform duration-300 transform-gpu hover:scale-105">
             <img class="w-52 m-5" src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
            <h3 class="ml-5 md-5 w-52 text-center font-bold text-white text-wrap text-2xl">${movie.title}</h3>
            </div>
                `;
                movieResults.appendChild(movieCard);
            });
        } else {
            movieResults.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}



async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) return;

    try {
        const response = await fetch(SEARCHAPI + searchInput);
        const data = await response.json();
        console.log(data);

        const movieResults = document.getElementById('movieResults');
        movieResults.innerHTML = '';

        if (data.results) {
            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                   <div class="m-5 w-60 h-[550]  flex flex-col   ">
                        <img class="w-60 " src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
                     
                        <p class="text-sm text-gray-600">${movie.release_date}</p>
                        <button onclick="displayMovieDetails('${movie.id}')" class="btn-details  items-end mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">View Details</button>
                         
                    </div>
                         
                        <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
                            <div class="bg-white  w-2/5 rounded-md p-6">
                                <h2 id="modalTitle" class="text-xl font-bold mb-2"></h2>
                                <p id="modalOverview"></p>
                                <p id="modalReleaseDate" class="mt-2"></p>
                                <p id="modalVoteAverage"></p>
                                <button onclick="closeModal()" class="btn-close mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Close</button>
                            </div>
                        </div>
                      
           
                     
                        
                   
                `;
                movieResults.appendChild(movieCard);
            });
        } else {
            movieResults.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}
async function displayMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=41ee980e4b5f05f6693fda00eb7c4fd4`);
        const data = await response.json();
        console.log(data);


        const modalTitle = document.getElementById('modalTitle');
        const modalOverview = document.getElementById('modalOverview');
        const modalReleaseDate = document.getElementById('modalReleaseDate');
        const modalVoteAverage = document.getElementById('modalVoteAverage');

        modalTitle.textContent = data.title;
        modalOverview.textContent = data.overview;
        modalReleaseDate.textContent = 'Release Date: ' + data.release_date;
        modalVoteAverage.textContent = 'Rating: ' + data.vote_average;


        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function closeModal() {
    // Hide modal
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}


window.onload = function () {
    Movies();
};

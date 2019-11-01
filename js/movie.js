const URL = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = "6be76a04b1d5dc2cdadbde209c765b70";
const language = "&language=en-US";
const query = "&query=";

$(document).ready(() => {
    $('nav form').on('submit', (event) => {

            let input = $('.search-text').val();
            //console.log(input);
            $('.loading').show();
            getMovies(input);
            event.preventDefault();
            $('.loading').fadeOut(1000);

        })
        //Hien danh sách các bộ phim trong Top Rated
    showTopRateMove();
})

//Hien danh sách các bộ phim được đánh giá cao.
function showTopRateMove() {

    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=6be76a04b1d5dc2cdadbde209c765b70`;
    //console.log(url);
    fetchData(url)
        .then(data => generateMovies(data));


}



//Lấy dữ liệu phim từ ten phim tren server
function getMovies(input) {
    let url = URL + API_KEY + query + input
    console.log(url);
    fetchData(url)
        .then(data => generateMovies(data));


}

async function fetchData(url) {
    return await fetch(url)
        //.then(res => console.log(res))
        .then(res => res.json())
        .catch(error => console.log(`Something wrong when get Data : `, error))
}

function generateMovies(data) {
    console.log(data);
    let movies = data.results;
    //console.log(movies);
    outputListMovies = '';
    $.each(movies, (index, movie) => {
        outputListMovies += `
            <div class="col-md-3 text-white bg-dark">
                <div id = "${movie.id}" class="well text-center">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h5>${movie.title}</h5>
                    <h6 class="card-vote_average">Voted: ${movie.vote_average}</h6>
                <!--<p class="card-text">${movie.overview}</p>-->
                    <a onclick="getDetailMovie('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
           
        `;
    });
    $('#movies').html(outputListMovies);
}

function getDetailMovie(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    console.log(movieID);
    let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=6be76a04b1d5dc2cdadbde209c765b70`
    console.log(url);
    fetchData(url)
        .then(data => generateMovie(data));
}

function generateMovie(data) {
    console.log(data);
    let movie = data;
    //console.log(movies);

    outputDetailMovie = `
        <div class="row pt-3">
            <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8 ">
                <h2 class = "text-white pb-5 pt-3">${movie.title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.genres}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Rated:</strong> NULL</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.vote_average}</li>
                    <li class="list-group-item"><strong>Director:</strong> NULL </li>
                    <li class="list-group-item"><strong>Writer:</strong> NULL</li>
                    <li class="list-group-item"><strong>Actors:</strong> NULL </li>
                </ul>
            </div>
        </div>
        <div class="row pt-3">
            <div class="well text-white">
                <h3>Over view</h3>
                ${movie.overview}
                <hr>
                <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go back to Home</a>
            </div>
        </div>
  
`;
    $('#movie').html(outputDetailMovie);

}
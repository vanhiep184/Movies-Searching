const URL = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = "6be76a04b1d5dc2cdadbde209c765b70";
const language = "&language=en-US";
const query = "&query=";
const buttonPreAndNextPage = `
    <div id="pagination" class="row bg-dark pb-3">
        <div class="col">
            <button type="button" onClick=previousPage(numberOfCurrentPage) class="btn btn-secondary btn-sm">Previous Page</button>
            <button type="button" class="btn btn-secondary btn-sm">Next Page</button>
        </div>
    </div>
`;
showTopRateMove();

$(document).ready(() => {

    //Hien danh sách các bộ phim trong Top Rated

    $('nav form').on('submit', (event) => {
        let input = $('.search-text').val();
        //console.log(input);
        //window.location = 'index.html';
        $('.loading').show();
        getMovies(input);
        event.preventDefault();
        $('.loading').fadeOut(1500);

    });

    $('#movies').on('mouseover', '.movie-card.col-md-3.pt-3.text-white', (event) => {
        //console.log($('#movies').children());
        console.log(event);
        console.log($(this));
        $(event.currentTarget).addClass("bg-secondary");
        // $(event.currentTarget).css({ 'background-color': 'transparent' });
    });
    $('#movies').on('mouseout', '.movie-card.col-md-3.pt-3.text-white', (event) => {

        $(event.currentTarget).removeClass("bg-secondary");
        // $(event.currentTarget).css({ 'background-color': 'transparent' });
    });



})

//Hien danh sách các bộ phim được đánh giá cao.
function showTopRateMove() {

    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=6be76a04b1d5dc2cdadbde209c765b70`;
    //console.log(url);
    fetchData(url)
        .then(data => generateMovies(data));


}


async function fetchData(url) {
    return await fetch(url)
        //.then(res => console.log(res))
        .then(res => res.json())
        .catch(error => console.log(`Something wrong when get Data : `, error))
}

//Lấy dữ liệu phim từ ten phim tren server
function getMovies(input) {
    let url = URL + API_KEY + query + input
    console.log(url);
    fetchData(url)
        .then(data => generateMovies(data));


}

function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    console.log(movieID);
    let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=6be76a04b1d5dc2cdadbde209c765b70`
    console.log(url);
    fetchData(url)
        .then(data => generateMovie(data));
}


function generateMovies(data) {
    console.log(data);
    let movies = data.results;
    //console.log(movies);
    outputListMovies = '';
    $.each(movies, (index, movie) => {

        let shortedOverView = getOverView(movie.overview);

        outputListMovies += `
            <div onclick="getDetailMovie('${movie.id}')" class="movie-card col-md-3 pt-3 text-white">
                <div id = "${movie.id}" class="well text-center">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h5 class= "pt-1">${movie.title}</h5>
                    <h6 class="card-vote_average"><strong>Rated:</strong> ${movie.vote_average}</h6>
                    <p class="card-text">${shortedOverView}</p>
                    <a onclick="getDetailMovie('${movie.id}')" class="btn btn-primary btn-sm" href="#">See detail...</a>
                </div>
            </div>
           
        `;
    });

    $('#movies').html(outputListMovies);
}

function generateMovie(data) {
    console.log(data);
    let movie = data;
    //console.log(movies);

    outputDetailMovie = `
    <div class= "container m-3 bg-secondary">
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
        <div class="row-md-3 pt-3 pb-3 ">
            <div class="well text-white">
                <h3>Over view</h3>
                ${movie.overview}
                <hr>
                <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go back to Home</a>
            </div>
        </div>
        </div>
`;
    $('#movie').html(outputDetailMovie);

}

function getDetailMovie(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getOverView(overview) {
    if (overview.length > 50) {
        overview = overview.substr(0, 100) + ' ...';
    }
    return overview;
}

function getRatedMovie(id) {
    return 1;
}

function getDirectorMovie(id) {
    return 1;
}

function getWriterMovie(id) {
    return 1;

}

function getActorMovie(id) {
    return 1;

}

function previousPage(numberOfCurrentPage, totalPage) {

}

function nextPage(numberOfCurrentPage, totalPage) {

}
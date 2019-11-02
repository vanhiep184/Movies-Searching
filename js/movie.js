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
        event.preventDefault();

        let input = $('.search-text').val();
        if (input == "") {
            return;
        } else {
            //console.log(input);
            //window.location = 'index.html';
            let titleShowListMovie = `Searching: ${input}`

            $('#title-show-movie').text(titleShowListMovie);
            $('.loading').show();
            //getMoviesbyName(input);
            getMoviesbyActorName(input);
            $('.loading').fadeOut(1500);
        }

    });

    $('#movies').on('mouseover', '.movie-card.col-md-3.pt-3.text-white', (event) => {
        //console.log($('#movies').children());
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
function getMoviesbyName(input) {
    let url = URL + API_KEY + query + input
    console.log(url);
    fetchData(url)
        .then(data => generateMovies(data));
}

function getMoviesbyActorName(input) {
    let url = `https://api.themoviedb.org/3/search/person?api_key=` + API_KEY + query + input;
    console.log(url);
    fetchData(url)
        .then(data => generateMoviesbyActor(data.results));
}

function generateMoviesbyActor(data) {
    console.log(data)
    outputListMovies = '';
    for (const movie of data) {
        console.log(movie);
        for (const childMovie of movie.known_for) {
            let shortedOverView = getOverView(childMovie.overview);
            //console.log(movie);
            console.log(childMovie.id);
            outputListMovies += `
                <div onclick="getDetailMovie('${childMovie.id}')" class="movie-card col-md-3 pt-3 text-white">
                    <div id = "${childMovie.id}" class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w500/${childMovie.poster_path}">
                        <h5 class= "pt-1">${childMovie.title}</h5>
                        <h6 class="card-vote_average"><strong>Rated:</strong> ${childMovie.vote_average}</h6>
                        <p class="card-text">${shortedOverView}</p>
                        <a onclick="getDetailMovie('${childMovie.id}')" class="btn btn-primary btn-sm" href="#">See detail...</a>
                    </div>
                </div>
               
            `;

        }
    }
    $('#movies').html(outputListMovies);

}


//APi from OMDb APi
function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    console.log(movieID);
    getImdbID(movieID);
}

function getImdbID(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=6be76a04b1d5dc2cdadbde209c765b70`
    console.log(url);
    fetchData(url)
        .then(data => getInfoMovieFromOMDb(data.imdb_id));

}

function getInfoMovieFromOMDb(imdb_id) {
    let url = `http://www.omdbapi.com?i=${imdb_id}&apikey=411051e9`;
    console.log(url);
    fetchData(url)
        // .then(data => console.log(data));
        .then(data => generateMovie(data));
}

function generateMovies(data) {
    console.log(data);
    let movies = data.results;
    //console.log(movies);
    outputListMovies = '';
    $.each(movies, (index, movie) => {
        let shortedOverView = getOverView(movie.overview);
        //console.log(movie);

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
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8 ">
                <h2 class = "text-white pb-5 pt-3">${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>                    
                    <li class="list-group-item"><strong>Genres:</strong> ${movie.Genre}</li>                    
                </ul>
            </div>
        </div>
        <div class="row-md-3 pt-3 pb-3 ">
            <div class="well text-white">
                <h3>Over view</h3>
                ${movie.Plot}
                <hr>
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


function getGenresMovie(Genres) {
    let listGenres = ''
    for (let Genre of Genres) {
        listGenres += `${Genre.name}, `;
    }
    listGenres = listGenres.substring(0, listGenres.length - 2) + '.'
    return listGenres;
}

function generateActors(listActors) {



    return 1;
}


function Actor(id, name, profile_path, known_for, creaditAll) {
    this.id = id;
    this.name = name;
    this.profile_path = profile_path;
    this.known_for = known_for;
    this.creaditAll = creaditAll;
}

function getActor(nameActor) {

}



function previousPage(numberOfCurrentPage, totalPage) {

}

function nextPage(numberOfCurrentPage, totalPage) {

}
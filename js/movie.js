const my_api_key = '6be76a04b1d5dc2cdadbde209c765b70'

$().ready(async() => {
    console.log('1')
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=6be76a04b1d5dc2cdadbde209c765b70`);
    const movies = await response.json();



    $('.card-group').empty();

    for (const movie of movies.results) {

        $('.card-group').append(`

            <div class="col-3 py-2 ">
                <div id = "${movie.id}" class="card" style="width: 18rem; height = 50rem;">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.id}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                    </div>
                </div>
            </div>
                        
        `);
        cutOverview(".card-text")

    }
    $('.loading').fadeOut(1000);




    async function findMovieByName(name) {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${my_api_key}&query=${name}`);
        const movies = await response.json();

        //    console.log(movies);

        for (const movie of movies.results) {

            $('.card-group').append(`
        
                <div class="col-3 py-2 ">
                    <div id = "${movie.id}" class="card" style="width: 18rem;">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.id}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <h6 class="card-id">ID: ${movie.id}</h6>
                            <p class="card-text">${movie.overview}</p>
                    
                        </div>
                    </div>
                </div>
                                    
            `);
            cutOverview(".card-text")


        }

    }

    async function findMovieByActorName(name) {
        const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${my_api_key}&query=${name}`);
        const movies = await response.json();

        console.log(movies);
        $('.card-group').append(`
        <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `);

        $('.card-group .spinner-border').hide()

        console.log($('.card-group').eq(0));
        for (const movie of movies.results) {
            for (const detail_movie of movie.known_for) {
                console.log(detail_movie);
                $('.card-group').append(`
                
                    <div class="col-3 py-2 ">
                        <div id = "${detail_movie.id}" class="card" style="width: 18rem; height = 36rem">
                            <img src="https://image.tmdb.org/t/p/w500/${detail_movie.poster_path}" class="card-img-top" alt="${detail_movie.id}">
                            <div class="card-body">
                                <h5 class="card-title">${detail_movie.title}</h5>
                                <h6 class="card-id">ID: ${detail_movie.id}</h6>
                                <p class="card-text">${detail_movie.overview}</p>
                            </div>
                        </div>
                    </div>
                                        
                `);
                cutOverview(".card-text")

            }
        }
    }
    //Tìm kiếm movie theo tên , theo diễn viên
    $('nav form').on('submit', async(event) => {

        event.preventDefault();

        var name = $('#search-movie').val();
        if (name == "") {
            return;
        } else {
            let titleShowListMovie = `Result of "${name}":`

            $('#title-show-movie').text(titleShowListMovie);

            $('.card-group').empty();
            $('.loading').show();
            findMovieByName(name);
            // findMovieByActorName(name);
            $('.loading').fadeOut(1000);
        }
    })


    //Xem chi tiết phim khi click vào các bộ phim

    $('.card').on('click', async function(event) {
        let id = this.id


        console.log(event.type)

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6be76a04b1d5dc2cdadbde209c765b70`);
        const movie = await response.json();

        console.log(movie);
        $('.card-group').append(`
                        
                    <div class="spinner-border m-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                `);

        $('.card-group').empty();

        $('.card-group').append(`
            
        
            <div class="col-lg-12">
                <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" class="card-img" alt="${movie.id}
                ">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">Genres: ${movie.release_date}</p>
                    <p class="card-text">Directors: ${movie.release_date}</p>
                    <p class="card-text">Actor: ${movie.release_date}</p>
                    <p class="card-text">Release date: ${movie.release_date}</p>
                </div>
            </div>
        
    
                        
        `);

    });




})

function cutOverview(classname) {
    console.log(classname)
    console.log($('classname'))
    if ($(classname).text().length > 50) {
        $(classname).text($(classname).text().substr(0, 50));
        $(classname).append('...');
    }
}



//Xem thong tin chi tiết các diễn viên của từng bộ phim khi đã click vào xem chi tiết


//Hiền thị được reviews cho movie

//Xủ lý phân trang
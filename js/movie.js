/*const request = async() => {

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6be76a04b1d5dc2cdadbde209c765b70&query=spider`);
    const movies = await response.json();
    console.log(movies);

    $('.card-group').empty();

    for (const movie of movies.results) {
        $('.card-group').append(`
        
            <div class="col-4 py-2 ">
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="..." class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        `);
    }

}

*/

$('nav form').on('submit', async(event) => {
    event.preventDefault();



    var movieName = $('#search-movie').val();



    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6be76a04b1d5dc2cdadbde209c765b70&query=${movieName}`);
    const movies = await response.json();

    console.log(movies);



    $('.card-group').append(`
        
        <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `);


    $('.card-group').empty();


    for (const movie of movies.results) {

        $('.card-group').append(`
        
            <div class="col-4 py-2 ">
                <div class="card" style="width: 18rem;">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                
                    </div>
                </div>
            </div>
                                
        `);

    }


})
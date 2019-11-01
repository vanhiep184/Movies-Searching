$(document).ready(async() => {
    $('nav form').on('submit', async(event) => {

        console.log(event);
        let input = $('.search-text').val();
        console.log(input);
        getMovies(input);
        e.preventDefault();
    })
})


document.querySelector('.favorite').addEventListener('click',()=>{


let all_favorite = JSON.parse(localStorage.getItem('favorite'));
let url = '';
let output = '';
let date = '';
let title= '';
let poster = '';

document.querySelector(".moveies").innerHTML='';

all_favorite.forEach( (item) =>{

    url = `https://api.themoviedb.org/3/${item.type}/${item.id}?api_key=f64fb17289f68980fc3435e0f9920d20&query&language=en-US`

    fetch(url)
    .then( (response) => { return response.json();})
    .then( (data) =>{
         
        if(item.type == "movie")
        {
           date = data.release_date;
           title = data.title;
           poster = (data.poster_path == null) ? '../img/default_film_cover.png' : `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        }
        else
        {
            date = data.first_air_date;
            title = data.name;
            poster = (data.backdrop_path == null) ? '../img/default_film_cover.png' : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
            
        }
        output += `
                   
        <div class="movie" onclick="show_information(${data.id})">
        
            <div class="movies_header">
                <div class="img" style="background-image:url('${poster}')" > </div>
                <div class="movie_slide"> 
                        <div class="information_movie flex j_center a_center d_column">
                        <h4 class='go_plot'>${title} (${item.type}) </h4>
                        <span >${date.substring(0,4)}</span>   
                      
                        </div>
                </div>
        
            </div>
        </div>`;

        // show the output data for eeach movie or tvshow
        document.querySelector(".moveies").innerHTML=output;
    });


});


})

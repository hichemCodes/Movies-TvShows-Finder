// our output result div
let output_element= document.querySelector('.result_info');


function show_information(id)
{

    
    let type = localStorage.getItem('type');
    var output = '';


    url=`https://api.themoviedb.org/3/${type}/${id}?api_key=f64fb17289f68980fc3435e0f9920d20&query&language=en-US`;

     /// add loading annimation befor fatching the data 
     output_element.classList.add('information_show');
     output_element.innerHTML= `<div class="container_all flex j_center a_center custum_container d_column full_hide">
                                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                 </div>`;

    // fetch the data 
    fetch(url)
    .then( response => { return response.json();})
    .then ( (data) =>{
           
            console.log(data);
             output += `<i class="fas fa-times" onclick="hide_information()"></i>
             <div class="header_info">

            <div class="header_info_o flex">
                <img src="https://image.tmdb.org/t/p//w300//${data.poster_path}" alt="">
                <div class="other_info flex d_column">
                    <span class="i_title">${data.title}</span>
                    <div class="score flex">
                        <div class="item_d"> <span>Relase Date : ${data.release_date}</span> </div>
                        <div class="item_d"><span>Language : ${data.original_language}</span> </div>
                        <div class="item_d"><span>Imdb Score : ${data.vote_average}</span> </div>
                    </div>
                    
                     <div class="flex d_column">
                            <span class="genres_s recap_h">Genres</span>
                            <span class="recap">${data.overview}</span>
                      </div>
                    <div class="flex aditional_info">

                           <div class="genres flex d_column">
                                   <span class="genres_s">Genres</span>`;
                                   data.genres.forEach( (genre) =>
                                   {
                                       output+= `<span>${genre.name}</span>`;
                                   });
                                   
                          output+= `</div>
                           <div class="run_time flex d_column">
                               <span class="genres_s">Run Time </span>
                               <span>${data.runtime}</span>
                               
                           </div>`;

                            if(type == 'movie') //if movie we add prodiction countries 
                            {
                                output+= 
                                `<div class="counties flex d_column">
                                    <span class="genres_s">Production Countries</span>`;

                                    data.production_countries.forEach( (country) =>
                                    {
                                        output+= `<span>${country.name}</span>`;
                                    });
                                    output+='</div>';
                            }
                            else  // else we add number of seasons and number of episodes
                            {
                                output+= `
                                <div class="flex d_column">
                                    <span class="genres_s">Number of Seasons </span>
                                    <span>${data.number_of_seasons}</span>
                                    
                                </div>
                                <div class="flex d_column">
                                    <span class="genres_s">Number of Episodes</span>
                                    <span>${data.number_of_episodes}</span>
                                    
                                </div>`;
                            }
                           
                           
                  output+= `
                           
                          
                    </div>
                    <div class="flex">
                        <a class="button is-danger is-active">watch trailer</a>
                        <a href="https://www.imdb.com/title/${data.imdb_id}" target="blank" class="button is-warning is-active">Visit in IMDB</a>
                        <span class="button is-danger is-active is-outlined add_fav" onclick="add_to_favorite(${data.id},'${type}')">
                                <i  class="far fa-heart fav"></i> 
                                <span>add to favorite</span>
                        </span>
                    </div>
                    
                   
                </div>
            </div>
       </div>
        `;  
        output_element.innerHTML += output; 
           
                // find cast and  of the movie or tv by passing the id to get_casts function 
                get_casts(data.id,type).then( (casts) =>{  

                    let casts_list = `<div class="casts flex d_column">
                    <span class="c_title">Casts</span>
                    <div class="casts_list flex j_between">`;
                    
                    casts.forEach( (cast) =>{
                              
                            let profile_path = (cast.profile_path == null) ? '../img/default_cast_profile.png' 
                                               : `https://image.tmdb.org/t/p//w200//${cast.profile_path}`;
                            casts_list +=`
                            <div class="cast flex d_column a_center">
                                <img src="${profile_path}" rel="actor pic">
                                <span class="cast_name">${cast.name}</span>
                                <span>${cast.character} </span>
                            </div>`;
                            
                        
                    });    

                    output_element.innerHTML += casts_list; 
                });

                //  find similair movies or tv-shows
                get_similar(data.id,type).then( (s_item) =>{
                     
                    
                    let similars_list = `<div class="similars flex d_column">
                    <span class="c_title">Similar</span>
                    <div class="similars_list flex j_between">`;

                    s_item.forEach( (movie_tv)=>{

                        similars_list+= `
                        <div class="similar flex d_column a_center" onclick="show_information(${movie_tv.id})">
                            
                            <div class="similar_cover" style="background-image:url('https://image.tmdb.org/t/p/w500/${movie_tv.poster_path}')"></div>
                            <span class="cast_name">${movie_tv.title}</span>
                            
                        </div>`;

                    });

                    output_element.innerHTML +=similars_list;

            })
            // remove animation and add result
            
            document.querySelector('.full_hide').remove();
            output_element.innerHTML +='</div></div>';
            


    })
    .catch( err =>{
        console.log(err);
    })
}

function get_casts(id,type)
{
     
     return fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=f64fb17289f68980fc3435e0f9920d20`)
     .then ( res => {return res.json();})
     .then (data => {
         
            return data.cast;
     })
     .catch ( err =>{
            console.log(err);
     });

}


function get_similar(id,type)
{
     
     return fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=f64fb17289f68980fc3435e0f9920d20`)
     .then ( res => {return res.json();})
     .then (data => {
         
            return data.results;
     })
     .catch ( err =>{
            console.log(err);
     });

}



// hide show information div

function hide_information(element)
{
    output_element.innerHTML='';
    output_element.classList.remove('information_show');
}


// add a movie or tv show to favorite list

function add_to_favorite(id,type)
{
    let add_fav = document.querySelector('.add_fav');

    
    document.querySelector('.fav').className ='fav fas fa-heart';///change hearth icon
    add_fav.className='button is-danger remove_fav'; //change button class
    add_fav.children[1].textContent ='remove from favorite';//cgange button text
    
    add_fav.onclick = '';// remove onclick to remove function 
    add_fav.addEventListener('click',function()  // add a remove click event
    {
        remove_from_favorite(id);
    });

    add_fav_localstrorage(id,type);

    
}


// add a movie or tv show to favorite list
function remove_from_favorite(id)
{
    
    let remove_fav = document.querySelector('.remove_fav');

    document.querySelector('.fav').className ='fav far fa-heart';///change hearth icon
    remove_fav.className='button is-danger add_fav is-outlined'; //change button class
    remove_fav.children[1].textContent ='add to favorite';//cgange button text

    remove_fav.onclick = '';// remove onclick to remove function 
    remove_fav.addEventListener('click',function()  // add a remove click event
    {
        add_to_favorite(id);
    });

    remove_fav_localstrorage(id);

    
}

function add_fav_localstrorage(id,type)
{
    let favorite;

    if(localStorage.getItem('favorite') === null)
    {
        favorite = [{
                    id : id,
                    type : type
                   }];
    }
    else
    {
        favorite = JSON.parse(localStorage.getItem('favorite'));
        favorite.push({
            id : id,
            type : type
           });
        
    }    
    localStorage.setItem('favorite',JSON.stringify(favorite));
}
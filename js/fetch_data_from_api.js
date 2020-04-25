
 // element variabls
 let query =document.querySelector('#desktop_search');    
 let moveies = document.querySelector(".moveies");

export default function fetch_data()
{
   
    let option = localStorage.getItem('option');
    let type = localStorage.getItem('type');
    let page = localStorage.getItem('page');

    let url = '';

    //add loader animation only if the page is 1
    if(page == 1)
    {
        moveies.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    }  
    
     if(query.value != '')
    {
        url=`https://api.themoviedb.org/3/search/${type}/?api_key=f64fb17289f68980fc3435e0f9920d20&query=${query.value},&page=${page}`;
    }
    else
    {
        url=`https://api.themoviedb.org/3/${type}/${option}?api_key=f64fb17289f68980fc3435e0f9920d20&query&language=en-US&page=${page}`;
    }
     
     
     fetch(url)
     .then( (response) =>{ return response.json();} )
        .then ( (data) =>{
            
            // call to create output from result function
            create_output(data,type,page);

        })
        .catch(function(error) {
            console.log(error);
        });

}

function create_output(data,type,page)
{
    let date = '';
    let title = '';
    let poster = '';
    let id = '';
    let type_item = '';
    let output = '';


    data.results.forEach( (element) =>{
               
        ///check if we're searching fir movies or tv show

        if(type == "movie")
        {
           date = element.release_date;
           title = element.title;
           poster = (element.poster_path == null) ? '../img/default_film_cover.png' : `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
           type_item="Movie";
        }
        else
        {
            date = element.first_air_date;
            title = element.name;
            poster = (element.backdrop_path == null) ? '../img/default_film_cover.png' : `https://image.tmdb.org/t/p/w500/${element.backdrop_path}`;
            type_item="TV";
        }
      
       id = element.id;
       output += `
                   
                   <div class="movie" onclick="show_information(${id})">
                   
                       <div class="movies_header">
                           <div class="img" style="background-image:url('${poster}')" > </div>
                           <div class="movie_slide"> 
                                   <div class="information_movie flex j_center a_center d_column">
                                   <h4 class='go_plot'>${title} (${type}) </h4>
                                   <span >${date.substring(0,4)}</span>   
                                 
                                   </div>
                           </div>
                   
                       </div>
                   </div>`;
                  
    });
   

    // show data 
   if(parseInt(page) == 1) // if the first page 
   {
       moveies.innerHTML=output;
   }
   else
   {
       //remove animaation from the button 
       document.querySelector('.pages button').classList.remove('is-loading');
       // output result
       moveies.innerHTML+=output;
   }
   // show load more button
   if(data.total_pages > page)
   {
       document.querySelector('.pages').style.display='flex';
   }
}




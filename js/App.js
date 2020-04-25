

import fetch_data from '../js/fetch_data_from_api.js';


let item_nav=document.querySelectorAll(".option_container .option_item");
let next_page_btn=document.querySelector("#addpage");
let current_search = document.querySelector('.current_search');  
let rounded_btn = document.querySelectorAll('.rounded');
let movie_checkbox = document.querySelector('#movies_r');
let tv_checkbox = document.querySelector('#tv_r');
let query =document.querySelector('#desktop_search'); 

// inisialize the search type to movies
localStorage.setItem('type','movie');
localStorage.setItem('page',1);
localStorage.setItem('option','now_playing');

/* call to fetch  function when the page loade  */
fetch_data();



item_nav.forEach( (element) =>{
     
            element.addEventListener('click',()=>{
               
              // change color of active link
              item_nav.forEach( (element2) =>{

                        if(element2.className.includes('active'))
                        {
                            element2.classList.remove('active');
                        } 

              });
                 
              element.classList.add('active');
       
              // search option  / the radio btn that currently checked

              if(movie_checkbox.className.includes('is_selected'))
              {
                    // edit localstorage set the option of movies search 
                    localStorage.setItem('option',element.id);
                    localStorage.setItem('type','movie');
                    
              }
              else 
              {
                    // edit localstorage set the option of tv series search
                    localStorage.setItem('option',element.getAttribute('tv_option'));
                    localStorage.setItem('type','tv');
                    
              }
                    
                    localStorage.setItem('page',1);
                    current_search.innerHTML = localStorage.getItem('type')+' : '+element.textContent; // update title of current search
                    fetch_data();
              
        });
    
});

// show result for the next page
next_page_btn.addEventListener('click',()=>{

     next_page_btn.classList.add('is-loading');
     let next_page_value = parseInt(localStorage.getItem('page'))+1;
     localStorage.setItem('page',next_page_value);
     fetch_data(localStorage.getItem('type'));

});

// switch movies and tv series checkbox

rounded_btn.forEach( (element) =>{
    
      element.addEventListener('click',()=>{
        
            rounded_btn.forEach((element2) =>{

                if(element2.className.includes('is_selected'))
                {
                    element2.classList.remove('is_selected');
                } 
                element.classList.add('is_selected');

                // update option variable in localStorag
                 update_option_localStorag();

                 // call the fetch data function 
                fetch_data();

            });
      })
});
//click to radio automaticly 
document.querySelector('.click_movie').addEventListener('click',()=>{

    document.querySelector('#movies_r').click();

});
document.querySelector('.click_tv').addEventListener('click',()=>{

    document.querySelector('#tv_r').click();

});

// update option variable in localStorag
function update_option_localStorag()
{
    item_nav.forEach( (element)=>{
         
           if(element.className.includes('active'))
            {
                if(movie_checkbox.className.includes('is_selected')) // movie radio_btn checked 
                {        
                    localStorage.setItem('type','movie'); 
                    localStorage.setItem('option',element.id);
                }
                else  // tv  radio_btn checked 
                {
                    localStorage.setItem('type','tv');
                    localStorage.setItem('option',element.getAttribute('tv_option'));
                }
                current_search.innerHTML = localStorage.getItem('type')+' : '+element.textContent;  // update title of current search
            }
    });
}


// on query change event 
query.addEventListener('input',()=>{

    fetch_data();
    
});

/// show movies or tv-shows information

function go_show_information(id)
{
     show_information(id);
}

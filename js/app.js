//classes
const ui = new UI(),
cocktail = new CocktailAPI();
cocktailDB = new CocktailDB();


//event listeners
function eventListeners(){

    //Document ready
    document.addEventListener('DOMContentLoaded', documentReady);

    //search form
    const searchForm = document.querySelector('#search-form')
    if(searchForm){
    searchForm.addEventListener('submit',getCocktails);
    }

    //tesulrts div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click',resultsDelegation);
    }
}

eventListeners();

function documentReady(){
    //display on load the favorites from storage

ui.isFavorite();

    ///
const searchCategory = document.querySelector('.search-category');
if(searchCategory){
    ui.displayCategories();
}

const favoritesTable = document.querySelector('#favorites');
if(favoritesTable){
    //Get the favorites from storage and display then
    const drinks = cocktailDB.getFromDB();
    ui.displayFavorites(drinks);


    favoritesTable.addEventListener('click',(e) =>{
        e.preventDefault();

        //Delegation
        if(e.target.classList.contains('get-recipe')){
            cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe =>{
                //display into modal
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
         }
         if(e.target.classList.contains('remove-recipe')){
             ui.removeFavorite(e.target.parentElement.parentElement);

             cocktailDB.removeFromDB(e.target.dataset.id);
             
         }
        
    })
}
}


function resultsDelegation(e){
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
       // getSingleRecipe()
       //console.log(e.target.getAttribute('data-id'));
       //console.log(e.target.dataset.id);
       cocktail.getSingleRecipe(e.target.dataset.id)
       .then(recipe =>{
           //display into modal
           ui.displaySingleRecipe(recipe.recipe.drinks[0]);
       })
    }else{
        console.log('Theres no recipe')
    }

    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
            //remove from storage
            cocktailDB.removeFromDB(e.target.dataset.id);
        }else{
            //add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            //add into storage

            cocktailDB.saveIntoDB(drinkInfo);

        }
    }

}

function getCocktails(e){
e.preventDefault();

const searchTerm = document.querySelector('#search').value;

if (searchTerm === ''){
    //call user i y decir error
    ui.printMessage("please, add something", 'danger');

}
else {
   //
       //server response from promise
       let serverResponse;
       //type of search (inghredients , cocktails or name
       
       const type =  document.querySelector('#type').value;

       switch(type){
            case 'name':
               serverResponse = cocktail.getDrinkByName(searchTerm);
               break;
            case 'ingredient':
               serverResponse = cocktail.getDrinkByIngredient(searchTerm);
               break;
            case 'category':
               serverResponse = cocktail.getDrinkByCategory(searchTerm);
               break;
            case 'alcohol':
                serverResponse = cocktail.getDrinkByAlcohol(searchTerm);
                break;
       }
       serverResponse.then(cocktails => {  
            if(cocktails.cocktails){
                if(cocktails.cocktails.drinks == null){
                ui.printMessage('There\' re no results, try a different term', 'danger')
                }else{
                        if(type ==='name'){
                        ui.dDWI(cocktails.cocktails.drinks);
                        }
                            else {
                                ui.dD(cocktails.cocktails.drinks);
                            }
                }
            }
            if(cocktails.recipe){
                if(cocktails.recipe.drinks == null){
                ui.printMessage('There\' re no results, try a different term', 'danger')
                }else{
                    
                    ui.dD(cocktails.recipe.drinks);
                    
                }
            }
        })
}
}




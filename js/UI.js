


class UI {
     displayCategories(){
          const categoryList = cocktail.getCategories()
          .then(categories =>{
              const catList = categories.drinks;

              //Append a first option without value

              const firstOption = document.createElement('option');
              firstOption.textContent = '- Select -';
              firstOption.value = ''
              document.querySelector('#search').appendChild(firstOption);

              //other options
              catList.forEach(categoryItem =>{
                   const category = categoryItem.strCategory;
               const nextOption = document.createElement('option');
               nextOption.textContent = categoryItem.strCategory;
               nextOption.value = categoryItem.strCategory.split(' ').join('_');
               document.querySelector('#search').appendChild(nextOption);
              })
          })
          
     }
    printMessage(message, className){

    const div = document.createElement('div');

    div.innerHTML = `
    <div class = "alert alert-dismissible alert-${className}">
          <button type="button" class="close" data-dismiss="alert">x</button>
          ${message}
    </div>
    `;

    //Insert before

    const reference = document.querySelector('.jumbotron h1');
    const parentNode = reference.parentElement;
    parentNode.insertBefore(div, reference);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

displayIngredients(drink){
     let ingredients = [];
     for (let i = 1; i < 16; i++){
          const ingredientMeasure = {};
          
          if(drink[`strIngredient${i}`] !== null){
          ingredientMeasure.ingredient = drink[`strIngredient${i}`];
          ingredientMeasure.measure = drink[`strMeasure${i}`];
          ingredients.push(ingredientMeasure);
          }
     }
     let ingredientsTemplate = '';
     ingredients.forEach(ingredient => {
          ingredientsTemplate += `<li class="list-group-item">${ingredient.measure} - ${ingredient.ingredient}</li>`
     })
      return ingredientsTemplate;
     }


    dDWI(drinks){
        const resultsWrapper = document.querySelector('.results-wrapper');
         resultsWrapper.style.display = 'block';

        //Insert the results
        const resultsDiv = document.querySelector('#results');;
        resultsDiv.innerHTML = ``;

        drinks.forEach(drink =>{
            resultsDiv.innerHTML +=`
            <div class="col-md-6">
            <div class="card my-3">
                 <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button> 
                 <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                 <div class="card-body" >
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <p class="card-text font-weight-bold">Instructions: </p>
                      <p class="card-text">
                            ${drink.strInstructions}
                      </p>
                      <p class="card-text">
                           <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li>
                                ${this.displayIngredients(drink)}
                                </ul>
                      </p>
                      <p class="card-text font-weight-bold">Extra Information:</p>
                      <p class="card-text">
                           <span class="badge badge-pill badge-success">
                                ${drink.strAlcoholic}
                           </span>
                           <span class="badge badge-pill badge-warning">
                                Category: ${drink.strCategory}
                           </span>
                      </p>
                 </div>
            </div>
       </div>
            `;
        }); 
        this.isFavorite();
        
    }


     dD(drinks){
               const resultsWrapper = document.querySelector('.results-wrapper');
               resultsWrapper.style.display = 'block';
     
               //Insert the results
               const resultsDiv = document.querySelector('#results');;
               resultsDiv.innerHTML = ``;
               console.log('mirame aqui');
               
               drinks.forEach(drink =>{
               resultsDiv.innerHTML +=`
               <div class="col-md-4">
                         <div class="card my-3">
                         <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button> 
                              <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                              <div class="card-body" >
                                   <h2 class="card-title text-center">${drink.strDrink}</h2>
                                   <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                              </div>
                         </div>
                    </div>
          `;
               });
               this.isFavorite();
     }

     displaySingleRecipe(recipe){
          const modalTitle = document.querySelector('.modal-title'),
          ModalDescription = document.querySelector('.modal-body .description-text'),
          modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

          //Set the values
          modalTitle.innerHTML = recipe.strDrink;
          ModalDescription.innerHTML = recipe.strInstructions;
          console.log('try', this.displayIngredients(recipe));
          modalIngredients.innerHTML = this.displayIngredients(recipe);
     }

     //Clear previous Results
     clearResults(){
          const resultsDiv = document.querySelector('#results');
          resultsDiv.innerHTML = ``;
     }

     //mostrar favoritos local storage
     displayFavorites(favorites){
          const favoritesTable = document.querySelector('#favorites');

          favorites.forEach(drink =>{
               const tr = document.createElement('tr');
               tr.innerHTML = `
               <td>
               <img src="${drink.image}" alt="${drink.name}" width=100>
               </td>
               <td>${drink.name}</td>
               <td>
               <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" 
               class="btn btn-success get-recipe">View</a>
               </td>
               <td>
               <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">Remove</a>
               </td>
               
               `;

               favoritesTable.appendChild(tr);

          })

     }
     removeFavorite(item){
          item.remove();
     }

     isFavorite(){
         
          const drinkss = new CocktailDB();
          const drinks = drinkss.getFromDB();

          console.log('sisisi', drinkss);
          drinks.forEach(drink => {
               //destructuring the id
               let {id} = drink;
               //select the favorites
               console.log('llega? a favoritos');
               let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
               if(favoriteDrink){
               console.log(id);
                    favoriteDrink.classList.add('is-favorite');
                    favoriteDrink.textContent = '-';
               }
          })
     }


}
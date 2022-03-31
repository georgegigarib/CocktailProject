class CocktailAPI{


    async getDrinkByName(name){
      

        const apiResponse = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        //return json response
        console.log(apiResponse)
        const cocktails = await apiResponse.json();
            return {
                cocktails
            }
    }
    async getDrinkByIngredient(ingredient){
        //search by ingredient
        const apiResponse = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        //return json response
        console.log(apiResponse)
        const cocktails = await apiResponse.json();
        console.log(cocktails);
            return {
                cocktails
            }
    }
    async getSingleRecipe(id){
        //search by ingredient
        const apiResponse = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        //return json response
        console.log(apiResponse)
        const recipe = await apiResponse.json();
        console.log(recipe);
            return {
                recipe
            }
    }

    //display drinks with ingredients
   

    //retrieves categories
    async getCategories(){
        //search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        //return json response
        const categories = await apiResponse.json();
            return categories
            
    }

    
    async getDrinkByCategory(category){
        //search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        //return json response
        console.log(apiResponse)
        const recipe = await apiResponse.json();
        console.log(recipe);
            return {
                recipe
            }
    }
    async getDrinkByAlcohol(term){
        //search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        //return json response
        console.log(apiResponse)
        const recipe = await apiResponse.json();
        console.log(recipe);
            return {
                recipe
            }
    }
}
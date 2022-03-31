class CocktailDB {

//Save recipes
saveIntoDB(drink){
const drinks = this.getFromDB();
drinks.push(drink);
localStorage.setItem('drinks', JSON.stringify(drinks));
console.log('LOG');
}

    //remove
    removeFromDB(id){
            console.log('llega aqui');
            const drinks = this.getFromDB();
            drinks.forEach((drink, index) =>{
                if(id === drink.id) {
                    drinks.splice(index,1);
                }
            });
            localStorage.setItem('drinks', JSON.stringify(drinks));
        }
//return recipes from storage
    getFromDB(){
        console.log('llega??????');
        let drinks;
        //check from localstorage

        if(localStorage.getItem('drinks') === null) {
            drinks = []
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks
    }

}
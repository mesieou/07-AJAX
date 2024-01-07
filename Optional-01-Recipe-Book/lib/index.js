const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
const searchButton = document.querySelector('#search-button');
const recipeTemplate = document.querySelector('#recipe-template');
const recipesContainer = document.querySelector('#recipes-container');
const favouritesContainer = document.querySelector('#favourites-container');

let recipes = [];

const insertRecipes = (recipes, container) => {
  recipes.forEach(recipe => {
    container.innerHTML += `<li>${recipe.meal}</li>`
  });
}

const fetchAndInsert = () => {
  const searchInput = document.querySelector('#search-input').value;

  console.log(searchInput)
  const newUrl = `${url}${searchInput}`
  console.log(newUrl)

  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.meals.forEach( meal => {
      recipes.push({ meal: meal.strMeal, image: meal.strMealThumb })
    });
    insertRecipes(recipes, recipesContainer)
  });


}

searchButton.addEventListener("click", fetchAndInsert)

// searchButton.addEventListener('click', fetchAndInsert())

// Todo: create a function to fetch the recipes from the API when the search input changes

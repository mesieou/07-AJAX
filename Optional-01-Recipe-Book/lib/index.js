const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
const searchButton = document.querySelector('#search-button');
const recipeTemplate = document.querySelector('#recipe-template');
const recipesContainer = document.querySelector('#recipes-container');
const favouritesContainer = document.querySelector('#favourites-container');

let recipes = [];

const insertMeals = (data, container) => {
  data.meals.forEach(meal => {
    const clone = recipeTemplate.content.cloneNode(true);
    clone.querySelector('img').src = meal.strMealThumb;
    clone.querySelector('h6').textContent = meal.strMeal;
    recipesContainer.appendChild(clone);
  });
}

const fetchAndInsert = () => {
  const searchInput = document.querySelector('#search-input').value;
  const newUrl = `${url}${searchInput}`

  fetch(newUrl)
  .then(response => response.json())
  .then(data => insertMeals(data, recipesContainer));
}

searchButton.addEventListener("click", fetchAndInsert)

// searchButton.addEventListener('click', fetchAndInsert())

// Todo: create a function to fetch the recipes from the API when the search input changes

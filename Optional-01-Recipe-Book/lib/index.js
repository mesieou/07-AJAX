import Mustache from "mustachejs";

const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const recipeTemplate = document.querySelector('#recipe-template');
const recipesContainer = document.querySelector('#recipes-container');
const favouritesContainer = document.querySelector('#favourites-container');

const addBookmark = (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove('fa-bookmark')
  const recipe = event.currentTarget.parentNode.parentNode;
  favouritesContainer.appendChild(recipe);
}

const listenForBookmarks = () => {
  const bookmarksElement = document.querySelectorAll('.fa-bookmark')
  const bookmarks = Array.from(bookmarksElement);

  bookmarks.forEach( bookmark => {
    bookmark.addEventListener('click', event => addBookmark(event));
  });
}

const insertMeals = (data) => {
  const mealData = {"meals": data.meals}
  const output = Mustache.render(recipeTemplate.innerHTML, mealData)
  recipesContainer.innerHTML = output;
  searchInput.value = ''
}

const checkMealsExist = (data) => {
  if (data.meals == null) {
    alert("no results")
    searchInput.value = ''
    recipesContainer.innerHTML = ''
  } else {
    insertMeals(data)
    listenForBookmarks()
  }
}

const fetchAndInsert = (event) => {
  event.preventDefault();
  const newUrl = `${url}${searchInput.value}`

  fetch(newUrl)
  .then(response => response.json())
  .then(data => checkMealsExist(data));
}

searchButton.addEventListener("click", event => fetchAndInsert(event))

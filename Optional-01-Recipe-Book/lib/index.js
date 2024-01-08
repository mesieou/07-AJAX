const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const recipeTemplate = document.querySelector('#recipe-template');
const recipesContainer = document.querySelector('#recipes-container');
const favouritesContainer = document.querySelector('#favourites-container');

const listenForBookmarks = () => {
  const bookmarksElement = document.querySelectorAll('.fa-bookmark')
  const bookmarks = Array.from(bookmarksElement);
  bookmarks.forEach( bookmark => {
    bookmark.addEventListener('click', event => {
      event.preventDefault();
      event.currentTarget.classList.remove('fa-bookmark')
      const recipe = event.currentTarget.parentNode.parentNode;
      favouritesContainer.appendChild(recipe);
    });
  });
}

const insertMeals = (data, container) => {
  recipesContainer.innerHTML = ''
  data.meals.forEach(meal => {
    const clone = recipeTemplate.content.cloneNode(true);
    clone.querySelector('img').src = meal.strMealThumb;
    clone.querySelector('h6').textContent = meal.strMeal;
    recipesContainer.appendChild(clone);
  });
  searchInput.value = ''
}

const checkMealsExist = (data) => {
  if (data.meals == null) {
    alert("no results")
    searchInput.value = ''
    recipesContainer.innerHTML = ''
  } else {
    insertMeals(data, recipesContainer)
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

const addBookMarkToFavorites = (event) => {
  console.log(event.cuurentTarget)
}

searchButton.addEventListener("click", event => fetchAndInsert(event))

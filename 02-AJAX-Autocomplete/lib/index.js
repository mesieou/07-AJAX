// TODO: Autocomplete the input with AJAX calls.
const input = document.querySelector('#search')
let results = document.querySelector('#results')

input.addEventListener('keyup', event => {
  let word = event.currentTarget.value;
  let apiUrl = `https://wagon-dictionary.herokuapp.com/autocomplete/${word}`;

  fetch(apiUrl)
    .then(response => response.json())
      // if (response.status === 200) {
      //   console.log(response.json())
      // } else {
      //   results.innerHTML = 'no words found'
      // }
    .then(data => {
      console.log(data)
      if (data.found !== false) {
        let wordListHtml = data.words.map(element => `<li>${element}</li>`).join('');
        results.innerHTML = wordListHtml
      } else {
        results.innerHTML = 'no words found'
      }
    });
})

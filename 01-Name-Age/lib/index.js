
const displayAge = (event) => {
  event.preventDefault();
  const firstName = document.getElementById("first-name").value;
  let yourAge = document.getElementById("your-age");
  const agifyApiUrl = `https://api.agify.io?name=${firstName}`
  // TODO: Display your age with an AJAX call instead of the console.log()
  fetch(agifyApiUrl)
    .then(response => response.json())
    .then(data => yourAge.textContent = `You're ${data.age} years old.`);
}

const form = document.getElementById("fetch-age");
form.addEventListener("submit", displayAge);

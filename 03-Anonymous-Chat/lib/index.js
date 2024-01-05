const batch = 1; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/general/messages";
const refreshButton = document.querySelector('#refresh')
const yourMessage = document.querySelector('#your-message').value
const yourName = document.querySelector('#your-Name').value
const form = document.querySelector('#comment-form')
let list = document.querySelector(".list-unstyled")

const currentTime = new Date
let message = { name: yourName, body: yourMessage }

const options = {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
}

const fetchMessages = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      let messagesHtml = data.messages.map(message => {
        let createdTime = new Date(message.created_at)
        let minutesDifference = Math.floor((currentTime - createdTime) / (1000 * 60))
        `<li>${message.content} (posted <span class="date">${minutesDifference} minutes ago</span>) by ${message.author}</li>`
      }).join('');
      console.log(messagesHtml)
      list.innerHTML = messagesHtml
    });
}

const postMessage = () => {
  fetch(baseUrl, message)
    .then(console.log(response))

}




refreshButton.addEventListener('click', event => fetchMessages());
form.addEventListener('submit', event => postMessage());

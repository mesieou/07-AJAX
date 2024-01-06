const batch = 1; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/general/messages";
const refreshButton = document.querySelector('#refresh');
const form = document.querySelector('#comment-form');
const currentTime = new Date;
let list = document.querySelector(".list-unstyled");

const formatMessageToHtml = (message) => {
    let createdTime = new Date(message.created_at);
    let minutesDifference = Math.max(0, Math.floor((currentTime - createdTime) / (1000 * 60)));
      return `<li>${message.content} (posted <span class="date">${minutesDifference} minutes ago</span>) by ${message.author}</li>`
}

const insertMessageToHtml = (data) => {
  let messagesHtml = data.messages.map((message) => formatMessageToHtml(message));
  list.innerHTML = messagesHtml.join('');
}

const fetchMessages = (event) => {
  event.preventDefault()
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => insertMessageToHtml(data));
}

const postMessage = (event) => {
  event.preventDefault()
  let yourMessage = document.querySelector('#your-message')
  let yourName = document.querySelector('#your-name')
  const message = { "author": yourName.value , "content": yourMessage.value }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }

  fetch(baseUrl, options)
    .then(response => response)
    .then(data => {
      alert('Created!')
      yourMessage.value = ''
      yourName.value = ''
    })
}

refreshButton.addEventListener('click', event => fetchMessages(event));
form.addEventListener('submit', event => postMessage(event));

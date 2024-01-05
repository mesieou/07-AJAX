const batch = 1; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/general/messages";

// Your turn to code!
const list = document.querySelector(".list-unstyled")
let currentTime = new Date

fetch(baseUrl)
  .then(response => response.json())
  .then(data => {
    const messagesHtml = data.messages.map(message => {
      let createdTime = new Date(message.created_at)
      let minutesDifference = Math.floor((currentTime - createdTime) / (1000 * 60))
      `<li>${message.content} (posted <span class="date">${minutesDifference} minutes ago</span>) by ${message.author}</li>`
    }).join('');

    list.innerHTML(messagesHtml)
  });

const batch = 1; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/general/messages";
const refreshButton = document.querySelector('#refresh')
const form = document.querySelector('#comment-form')
let list = document.querySelector(".list-unstyled")
const currentTime = new Date

const fetchMessages = (event) => {
  event.preventDefault()
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      let messagesHtml = data.messages.map((message) => {
        let createdTime = new Date(message.created_at)
        let minutesDifference = Math.max(0, Math.floor((currentTime - createdTime) / (1000 * 60)))
        console.log(createdTime)
        console.log(currentTime)
        console.log(minutesDifference)

        return `<li>${message.content} (posted <span class="date">${minutesDifference} minutes ago</span>) by ${message.author}</li>`
      }).join('');
      list.innerHTML = messagesHtml
    });
}

const postMessage = (event) => {
  event.preventDefault()
  const yourMessage = document.querySelector('#your-message').value
  const yourName = document.querySelector('#your-name').value
  let message = { "author": yourName , "content": yourMessage }


  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }

  fetch(baseUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
    .then(response => response)
    .then(data => console.log(data))
    .catch(error => {
      console.error('Error:', error)});

}




refreshButton.addEventListener('click', event => fetchMessages(event));
form.addEventListener('submit', event => postMessage(event));

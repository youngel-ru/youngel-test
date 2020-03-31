const socket = io('http://youngel.ru:80')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-box')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
// const inputName = document.getElementById('')


if (messageForm != null) {
  const name = prompt('Как вас зовут?')
  appendMessage('Вы подключились к комнате')
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Вы: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('room-created', (room, event) => {

  const divv = `<div class="card room-card col-10 col-sm-5 col-xl-3 col-lg-3 col-md-5">
<div class="card-body">
  <h5 class="card-title">` + room + `</h5>
  <!-- <h6 class="card-subtitle mb-2 text-muted">Создатель: <%= name %></h6> -->
  <a href="/` + room + `" class="card-link">Войти</a>
</div>
</div>`
  roomContainer.innerHTML = divv
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`"${name}" зашёл(ла) в комнату`)
})

socket.on('user-disconnected', name => {
  appendMessage(`"${name}" вышел(ла) из комнаты`)
})

function appendMessage(message) {
  if(message.match(/Вы подключились к комнате/g)  || message.match(/зашёл\(ла\)/g) || message.match(/вышел\(ла\)/g)) {
    const messageElement = document.createElement('div')
  messageElement.className = "messageBox3"
  messageElement.innerText = message
  messageContainer.append(messageElement)
  } else if(message.match(/Вы:/g)) {
    const messageElement = document.createElement('div')
  messageElement.className = "messageBox1"
  messageElement.innerText = message
  messageContainer.append(messageElement)
  } else {
  const messageElement = document.createElement('div')
  messageElement.className = "messageBox2"
  messageElement.innerText = message
  messageContainer.append(messageElement)
  }
}

const socket = io('/chat');

const message = document.getElementById('message');
const sent_message = document.getElementById('sent_message');

message.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    send();
  }
});

function send() {
  if(message.value) {
    socket.emit('hearMessage', message.value);
    message.value = '';
    message.focus();
  }
}

socket.on('hearMessage', (message) => {
  addNewMessageInChat(message);
});

function addNewMessageInChat(message) {
  let addMessage = document.createElement('li');
  addMessage.appendChild(document.createTextNode(message));
  sent_message.appendChild(addMessage);
}


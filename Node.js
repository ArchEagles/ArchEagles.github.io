const socket = io('http://localhost:3000');

// Handle message sending
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message) {
    // Send message to the server
    socket.emit('chat message', message);

    // Clear the message input
    messageInput.value = '';
  }
});

// Handle incoming messages
socket.on('chat message', (message) => {
  // Display the received message
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <p>${message.username}: ${message.message}</p>
  `;
  chatMessages.appendChild(messageElement);

  // Scroll to the bottom of the chat messages container
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const socket = io('http://localhost:8000');

const form = document.getElementById("input-message");
const message = document.getElementById("text");
const messageContainer = document.querySelector(".container");
var audio = new Audio("Music/notification.mp3");
//this event executes when user click on send button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = message.value;
    append(`You:${text}`, "right");
    socket.emit('send', text);
    message.value = "";

})

function append(message, position) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
const name = prompt('Enter your name');
//socket.emit() runs the new-user-enter event in socket.io
socket.emit('new-user-enter', name);
//socket.on receives the event 
socket.on('user-enter', name => {
    append(`${name} joined the chat`, "right");
});

socket.on("receive", data => {
    append(`${data.name}:${data.message}`, 'left');
})
socket.on("leave", data => {
    append(`${data} left the chat`, 'right');
})
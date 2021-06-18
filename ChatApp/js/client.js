const socket=io('http://localhost:8000');

const meassageContainer=document.querySelector('.container')
const messageInput=document.querySelector('#messageInp')
const form=document.querySelector('#send-container')


const username=prompt("Enter your name to join:");
socket.emit('new-user-joined',username);


const appendMessage= (message,position) =>{
    var msg=document.createElement("div")
    msg.innerHTML=message
    msg.classList.add=('message')
    msg.classList.add=position
    meassageContainer.append(msg)
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const msg=messageInput.value
    appendMessage(`You : ${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''
})



socket.on('user-joined',name=>{
    appendMessage(`${name} has joined the chat`,'right')
});
socket.on('receive',data=>{
    appendMessage( `${data.name}:${data.message}`,'left')
});
socket.on('left',name=>{
    appendMessage( `${name} left the chat`,'right')
});
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

//ishan's code
const messageContainer=document.querySelector('.container')
const messageInput=document.querySelector('#messageInp')
const form=document.querySelector('#send-container')

const appendMessage= (message,position) =>{
    const msg=document.createElement("div");
    msg.innerText=message;
    msg.classList.add('message');
    msg.classList.add(position);
    messageContainer.append(msg)
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const msgVal=messageInput.value
    appendMessage(`You : ${msgVal}`,'left')
    socket.emit('send',msgVal);
    messageInput.value=''
})

const username = prompt("Enter your name to join:");
socket.emit('new-user-joined',username);


socket.on('user-joined',name=>{
    appendMessage(`${name} has joined the chat`,'right')
});
socket.on('receive',data=>{
    appendMessage( `${data.name}:${data.message}`,'right')
});
socket.on('left',(name)=>{
    appendMessage( `${name} left the chat`,'right')
});

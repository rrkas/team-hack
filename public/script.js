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
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const users={};

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.emit('user-connected', userId)
    socket.on('disconnect',message=>{
      socket.broadcast.emit('user-disconnected', userId)
    });
  })
  socket.on('new-user-joined',(name)=>{
      users[socket.id]=name
      socket.broadcast.emit('user-joined',name)
  });
  socket.on('send',message=>{
      socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
  });
  socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id]
  });
  //   socket.to(roomId).broadcast?.emit('user-connected', userId)

  //   socket.on('disconnect', () => {
  //     socket.to(roomId).broadcast?.emit('user-disconnected', userId)
  //   })
  // })
})

server.listen(3000)
const io = require('socket.io')(process.env.PORT || 8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection',socket =>{
    socket.on('new-user-jonied',naam => {
        console.log(naam,"joined the chat");
        users[socket.id] = naam;
        socket.broadcast.emit('user-joined',naam);
    });
    socket.on('send',message=>{
        console.log(message);
        socket.broadcast.emit('recieve',{ username:users[socket.id] , message: message })
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('leftt',users[socket.id])
        delete users[socket.id];
    })
})



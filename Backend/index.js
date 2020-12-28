//Node server
//8000 is default port of socket.io
const io = require('socket.io')(8000);
const users = {};

//it will create a connection every time when user join the chat
io.on('connection', socket => {
    //when new user joins then this event will run
    socket.on('new-user-enter', data => {
        users[socket.id] = data;
        //socket.broadcast.emit() shows the other users
        socket.broadcast.emit('user-enter', data);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', data => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id]
    });
})
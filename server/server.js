const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// making available server to socketIO
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User connected.');

    // Socket.emit from Admin with text with a welcome
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Hey welcome to the chatroom!',
        createdAt: new Date().getTime()
    });

    // Socket.broadcast from Admin text New User Joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    // Receives messages from client
    socket.on('createMessage', (message)=>{
        // io.emits to all connections
        // socket.io emits to a single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
       // Broadcasts to other connections but not your own.
       /*
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
         */
    });

    socket.on('disconnect',()=>{
        console.log('Disconnected from client.')
    });
});

server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
});
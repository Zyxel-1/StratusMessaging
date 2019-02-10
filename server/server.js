const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

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
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chatroom!'));

    // Socket.broadcast from Admin text New User Joined
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined!'));

    // Receives messages from client
    socket.on('createMessage', (message, callback)=>{
        // io.emits to all connections
        // socket.io emits to a single connection
        io.emit('newMessage',generateMessage(message.from,message.text));
        // Calls the callback in the client for acknowledgement
        callback('This is from the server.');
    });

    // Sends location message to users
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });


    socket.on('disconnect',()=>{
        console.log('Disconnected from client.')
    });
});

server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
});
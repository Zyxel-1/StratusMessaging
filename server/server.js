const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const{Users} = require('./utils/users')
const {
    isRealString
} = require('./utils/validation');

const publicPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

// making available server to socketIO
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected.');

    // Receives messages from client
    socket.on('createMessage', (message, callback) => {
        // io.emits to all connections
        // socket.io emits to a single connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        // Calls the callback in the client for acknowledgement
        callback();
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Error: Valid Name and Room are required.")
        }
        socket.join(params.room);
        // Leave other room and enter a new room
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        // Returns list of users in room
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        // Socket.emit from Admin with text with a welcome
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chatroom!'));
        // Socket.broadcast from Admin text New User Joined
        socket.broadcast.to(`${params.room}`).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room.`));
        callback();
    })
    // Sends location message to users
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client.')
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Server',`${user.name} has left the chat`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
});
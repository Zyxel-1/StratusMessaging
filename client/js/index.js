var socket = io();

socket.on('connect', function () {
    console.log('Connected to server.');
    
});

socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message){
    console.log('newMessage',message);
    
    // Displaying messages to the screen
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();
    
    // Emits message in input box
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});
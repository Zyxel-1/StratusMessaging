var socket = io();

socket.on('connect', function () {
    console.log('Connected to server.');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});

// Displays new messages in chat
socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

// Display locations in chat
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

// Sends message to Server
jQuery('#message-form').on('submit', function (e){
    e.preventDefault();
    
    var messageTextBox = jQuery('[name=message]');
    // Emits message in input box
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

// Getting user's location
var locationButton = jQuery('#send-location');

locationButton.on('click',function (){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position){
        

        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        locationButton.removeAttr('disabled').text('Send Location Here')

    }, function (){
        locationButton.removeAttr('disabled').text('Send Location Here')
        alert('Unable to fetch location.');
    });
});
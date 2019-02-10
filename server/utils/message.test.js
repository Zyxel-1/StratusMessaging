var expect = require('expect');
var{generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () =>{
        // Defining Variables
        var from = 'Todd';
        var text = 'Some Message';

        // Generate Object
        var message = generateMessage(from, text);

        // Testing if above object was created correctly
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () =>{
    it('should generate the correct location message object', () =>{
        var from = 'Todd';
        var longitude = '0';
        var latitude = '0';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`

        var locationMessage = generateLocationMessage(from,latitude,longitude);

        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage.url).toBe(url);
        expect(locationMessage.from).toBe(from);
    })
})
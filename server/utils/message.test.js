var expect = require('expect');
var{generateMessage} = require('./message');

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
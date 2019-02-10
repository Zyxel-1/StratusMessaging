const expect = require('expect');
const {isRealString} = require('./validation')

describe('is Real string',()=>{

    it('should fail for non-string values',()=>{
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('should fail if value are spaces',()=>{
        var res = isRealString('     ');
        expect(res).toBe(false);
    });
    it('should pass if value is string ',()=>{
        var res = isRealString('   asdfasdf  asdf   ');
        expect(res).toBe(true);
    });
});
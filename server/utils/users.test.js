const expect = require('expect');
const {Users} = require('./users')

describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'AA'
        }, {
            id: '2',
            name: 'Rob',
            room: 'CC'
        }, {
            id: '3',
            name: 'Ryan',
            room: 'CC'
        }];
    });

    it('should add a user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'rob',
            room: 'CC'
        }
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should remove user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove user from list', () => {
        var userId = '100';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    it('should get user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    })
    it('should not get user from list', () => {
        var userId = '10';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    })
    it('should get names from room CC', () => {
        var userList = users.getUserList('CC');

        expect(userList).toEqual(['Rob', 'Ryan'])
    })
    it('should get the one name from AA', () => {
        var userList = users.getUserList('AA');
        expect(userList).toEqual(['Mike']);
    })
})
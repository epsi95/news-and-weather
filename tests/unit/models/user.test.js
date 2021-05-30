const { it, expect } = require('@jest/globals');
const user = require('../../../models/user');
const db = require('../../../models/db');

describe('Suite: user', ()=>{
    beforeEach(()=>db.dropAllData()); // clear the database before every test
    afterEach(()=>db.dropAllData()); // clear the database after every test

    it('should throw an error if I try to create user with wrong data', async ()=>{
        await expect(user.createUser('fizzbuzz', 'password')).rejects.toThrow();
        await expect(user.createUser('example@gmail.com')).rejects.toThrow();
        await expect(user.createUser()).rejects.toThrow();
        await expect(user.createUser()).rejects.toThrow();
        await expect(user.createUser('example@gmail.com', '')).rejects.toThrow();
    });

});
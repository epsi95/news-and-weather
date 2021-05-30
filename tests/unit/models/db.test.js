// actually a test db should be created
// but for simlicity I am useing the dummy database
const { beforeAll, it, expect, beforeEach, afterEach } = require('@jest/globals');
const db = require('../../../models/db');

describe('Suite: db', ()=>{
    beforeEach(()=>db.dropAllData()); // clear the database before every test
    afterEach(()=>db.dropAllData()); // clear the database after every test

    it('should insert a user into db successfully', ()=>{
        db.insertUserIntoDatabase({email: 'email', password: 'password'});
        expect(db.getUserFromDatabase('email')).toEqual({email: 'email', password: 'password'});
    });

    it('should throw error if I try to insert save user i.e. user with same email', ()=>{
        db.insertUserIntoDatabase({email: 'email', password: 'password'});
        expect(()=>db.insertUserIntoDatabase({email: 'email', password: 'password'})).toThrow();
    });
});
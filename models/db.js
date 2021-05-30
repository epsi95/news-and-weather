const userDb = [];

const insertUserIntoDatabase = (userObject)=>{
    if(!!getUserFromDatabase(userObject.email)) throw new Error('user already exists');
    userDb.push(userObject);
}

const getUserFromDatabase = (email)=>{
    return userDb.find((userObject)=>userObject.email === email);
}

const dropAllData = ()=>{
    userDb.length = 0;
}

module.exports.insertUserIntoDatabase = insertUserIntoDatabase;
module.exports.getUserFromDatabase = getUserFromDatabase;
module.exports.dropAllData = dropAllData;
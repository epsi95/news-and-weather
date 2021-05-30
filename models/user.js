const db = require('./db');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const saltRounds = 10;
const jwtToken = config.get('JwtToken');

const signupUserSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

async function createUser(email, password){
    await signupUserSchema.validateAsync({email: email, password: password});
    const hash = await bcrypt.hash(password, saltRounds);
    db.insertUserIntoDatabase({
        email: email,
        password: hash
    });
}

async function validateUser(email, password){
    const user = db.getUserFromDatabase(email);
    if(!user) throw new Error('User does not exist');
    const result = await bcrypt.compare(password, user.password);
    if(result) return {token: jwt.sign({ email: email }, jwtToken, { expiresIn: '1h' })};
    else throw new Error('Can not find a user');
}

function validateJwtToken(req, res, next){
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtToken);
        next();
      } catch(err) {
        return res.status(400).send('Invalid request');
      }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
module.exports.validateJwtToken = validateJwtToken;
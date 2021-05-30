const express = require('express');
const user = require('../models/user');


const router = express.Router();

router.post('/', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        await user.createUser(email, password);
        return res.send('User created successfully');
    }
    catch (err) { 
        return res.status(400).send('Unable to create user');
    }
})

module.exports = router;
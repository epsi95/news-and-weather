const express = require('express');
const user = require('../models/user');


const router = express.Router();

router.post('/', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userObject = await user.validateUser(email, password);
        return res.send(userObject);
    }
    catch (err) { 
        console.log(err);
        return res.status(400).send('Unable to log in');
    }
})

module.exports = router;
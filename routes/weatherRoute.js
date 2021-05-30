const express = require('express');
const weather = require('../models/weather');

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const weatherData = await weather.getLastFiveDaysForcast(28.38, 77.12);
        return res.send(weatherData);
    }catch(error){
        console.log(error);
        return res.status(500).send('unable to fetch user information');
    }

});

module.exports = router;
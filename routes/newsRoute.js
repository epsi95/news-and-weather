const express = require('express');
const news = require('../models/news');

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const keyword = req.query.search;
        const newsData = await news.getNews(keyword);
        return res.send(newsData);
    }catch(error){
        console.log(error);
        return res.status(500).send('unable to fetch news information');
    }
});

module.exports = router;
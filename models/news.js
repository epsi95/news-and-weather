const config = require('config');
const fetch = require('node-fetch');

const newsApiKey = config.get('NewsApi.apiKeyConfig.apiKey');

function constructNewsObject(rawNewsdata) {
    return {
        data: rawNewsdata.articles.map((data) => {
                return {
                    headline: data.title,
                    link: data.url
                }
            })
        ,
    }
}

async function getNews(keyword) {
    const response = await fetch(
        !!keyword ? 
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=10&apiKey=${newsApiKey}`
        : 
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${newsApiKey}`
        );
    const newsData = await response.json();
    const newNewsObject = constructNewsObject(newsData);
    newNewsObject.count = newNewsObject.data.length;
    return newNewsObject;
}

module.exports.getNews = getNews;
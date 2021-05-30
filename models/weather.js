const config = require('config');
const fetch = require('node-fetch');

const weatherApiKey = config.get('WeatherApi.apiKeyConfig.apiKey');

function constructWeatherObject(rawWeatherdata){
    return {
        count:5,
        unit: 'metric',
        location: rawWeatherdata.city.name,
        data: (
            rawWeatherdata.list.map((data, index)=>{
                if(index % 8 === 0){
                    return {
                        date: data.dt_txt,
                        main: data.weather[0].main,
                        temp: data.main.temp
                    }
                }
            }).filter((data)=> !!data)
        )
    };
}

async function getLastFiveDaysForcast(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`);
    const weatherData = await response.json();
    console.log(weatherData);
    return constructWeatherObject(weatherData);
}

module.exports.getLastFiveDaysForcast = getLastFiveDaysForcast;
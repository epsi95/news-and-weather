# news-and-weather

## STEP 1
Before you start, make sure Radis server is up and running since the server uses Radis to cache data. Make sure that it is running on port 6379.

Make sure by
```
redis-cli

127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```
If you have different configuration then go to `app.js` and change
```
const cache = require('express-redis-cache')({ expire: 0.5*60*60 });
```
to
```
const cache = require('express-redis-cache')({
   host: String, port: Number, auth_pass: REDIS_PASSWORD, expire: 0.5*60*60 
  });
```

Next initialize the environment variables
```
export NEWS_API_KEY=<news api key>
export WEATHER_API_KEY=<weather api>
```
## STEP 2
Install all the packages by `npm i`

## STEP 3
Run the server `nodemon app.js` or `node app.js`

This will start a server `localhost:8080`, if you have `PORT` environment variable set to some other port, it will use that.

---

## REST API
There are 4 APIs defined. Go to the folder named <a href="./postman_collection">postman_collection</a> to test them in Postman.
```
POST /signup

It is used to sign up. User need to send JSON Body
{
    "email": "example@gmail.com",
    "password": "password"
}
```
```
POST /login

It is used to login. Provide the email and password in the body. In response you will get token (JWT).
```
```
GET /api/weather

It is used to get weather forcast for 5 days.
```

```
GET /api/news?search=bitcoin

Requires authentication. User needs to add this header

Authorization : Bearer <token received fron login>

It will give news. If the quey parameter search is omitted, the top headlines in india will be provided.
```

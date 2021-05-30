const express = require('express');
const helmet = require('helmet');
const cache = require('express-redis-cache')({ expire: 0.5*60*60 }); // cahce expires after half an hour

const weatherRoute = require('./routes/weatherRoute');
const newsRoute = require('./routes/newsRoute');
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');

const db = require('./models/db');
const validateJwtToken = require('./models/user').validateJwtToken;

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.use('/api/news', validateJwtToken, cache.route(), newsRoute);

// By default, redis-express-cache connects to Redis using localhost as host and nothing as port 
//(using Redis default port 6379). To use different port or host, declare them when you 
//require express-redis-cache. If your Redis server requires password, use the auth_pass option.

// var cache = require('express-redis-cache')({
//   host: String, port: Number, auth_pass: REDIS_PASSWORD
//   });
app.use('/api/weather', cache.route(), weatherRoute);

const port = process.env.PORT || 8080;
app.listen(port, ()=>`Server started at port ${port}`);
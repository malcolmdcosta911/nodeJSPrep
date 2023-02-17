
const pug = require('pug');
const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const log = require('./middleware/logger');

const courses = require('./routes/courses');
const home= require('./routes/home');

const express = require('express');
const app = express();
const Joi = require('joi');

//enviroments
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//OR
// console.log(`app: ${app.get('env')}`);


//configuration
// console.log(`config.get('name'):  ${config.get('name')}`);
// console.log(`config.has('mail.host'):  ${config.has('mail.host')}`);
// console.log(`config.get('mail.password'):  ${config.get('mail.password')}`);

//creating custom milddeware
app.use(log);


//third party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);



if (app.get('env') == 'development') {
    startupDebugger('Morgan enabled...');
    app.use(morgan('tiny'));
}

app.set('view engine', 'pug');
app.set('views', './views'); //default

//db work...
//dbDebugger('db Work...')

const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger("lsitening on " + port));
const express = require('express');
const routers = express.Router();

const movies = require('./movies');
const schedules = require('./schedules');
const booking = require('./booking');
const users = require('./users');
const auth = require('./auth');

routers.use('/movies', movies);
routers.use('/schedules', schedules);
routers.use('/booking', booking);
routers.use('/users', users);
routers.use('/auth', auth);

module.exports = routers;

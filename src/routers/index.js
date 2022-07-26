const express = require('express');
const routers = express.Router();

const users = require('./users');
const auth = require('./auth');
const admin = require('./admin');

routers.use('/users', users);
routers.use('/auth', auth);
routers.use('/admin', admin);

module.exports = routers;

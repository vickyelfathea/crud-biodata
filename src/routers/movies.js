const express = require('express');
const routers = express.Router();
const ctrl = require('../controllers/movies');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

routers.get('/show', ctrl.getAll);
routers.get('/show/index', ctrl.getPage);
routers.get('/show/search', ctrl.Search);
routers.get('/show/byname/year', ctrl.ShowByNameYear);
routers.post(
  '/add',
  validate.admin,
  upload.image.single('images'),
  ctrl.Create
);
routers.put('/update', ctrl.Update);
routers.delete('/delete', ctrl.Delete);

module.exports = routers;

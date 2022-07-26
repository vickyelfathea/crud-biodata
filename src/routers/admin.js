const express = require('express');
const routers = express.Router();
const ctrl = require('../controllers/admin');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

routers.get('/', validate.user, ctrl.getAll);
routers.post('/add', ctrl.Create);
routers.delete('/:id', validate.admin, ctrl.deletePhoto);
routers.put(
  '/update/:id',
  validate.admin,
  upload.user.single('displayImage'),
  ctrl.updatePhoto
);

module.exports = routers;

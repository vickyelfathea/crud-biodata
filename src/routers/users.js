const express = require('express');
const routers = express.Router();
const ctrl = require('../controllers/users');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

routers.get('/', validate.user, ctrl.getAll);
routers.post(
  '/add',
  validate.admin,
  upload.user.single('pasfoto'),
  ctrl.Create
);
routers.delete('/delete/photo/:id', validate.admin, ctrl.deletePhoto);
routers.delete('/delete/:id', validate.admin, ctrl.Delete);
routers.put(
  '/update/:id',
  validate.admin,
  upload.user.single('pasfoto'),
  ctrl.updatePhoto
);

module.exports = routers;

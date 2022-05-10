const express = require('express');
const routers = express.Router();
const ctrl = require('../controllers/users');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

routers.get('/', validate.user, ctrl.getAll);
routers.post('/add', upload.user.single('displayImage'), ctrl.Create);
routers.delete('/:id', validate.admin, ctrl.deletePhoto);
routers.put(
  '/update/:id',
  validate.admin,
  upload.user.single('displayImage'),
  ctrl.updatePhoto
);

module.exports = routers;

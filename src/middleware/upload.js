const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/image',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const user = multer.diskStorage({
  destination: 'public/user',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpeg'
  ) {
    console.log('here');
    cb(null, true);
  } else {
    console.log('here');
    cb(null, false);
  }
};

const uploads = {};

uploads.image = multer({
  storage: storage,
  fileFilter: filter,
});

uploads.user = multer({
  storage: user,
  fileFilter: filter,
});

module.exports = uploads;

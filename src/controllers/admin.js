const models = require('../models/admin');
const respone = require('../helpers/respone');
const { HashPasswords } = require('../helpers/hash');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const users = {};

users.deletePhoto = async (req, res) => {
  try {
    const db = req.params.id;
    const path = await models.searchData(db);
    const data = await unlinkAsync(path);
    const dbDelete = await models.dbDelete(db);
    return respone(res, 200, path);
  } catch (error) {
    console.log(error);
    return respone(res, 500, error);
  }
};

users.updatePhoto = async (req, res) => {
  try {
    let displayImage = '';
    if (req.file !== undefined) {
      displayImage = req.file.path;
    }

    const db = req.params.id;
    const path = await models.searchData(db);
    const del = await unlinkAsync(path);
    const dbDelete = await models.dbDelete(db);

    const data = await models.Update(db, displayImage);

    return respone(res, 200, data);
  } catch (error) {
    console.log(error);
    return respone(res, 500, error);
  }
};

users.getAll = async (req, res) => {
  try {
    const data = await models.getData();
    return respone(res, 200, data);
  } catch (error) {
    return respone(res, 500, error);
  }
};

users.Create = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashPassword = await HashPasswords(password);
    const data = await models.addData({
      email,
      hashPassword,
      role,
    });
    return respone(res, 200, data);
  } catch (error) {
    console.log(error);
    res.send('Maaf error terjadi di ctrl');
  }
};

module.exports = users;

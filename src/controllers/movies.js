const model = require('../models/movies');
const respone = require('../helpers/respone');
const movies = {};

movies.getAll = async (req, res) => {
  try {
    const data = await model.getData();
    return respone(res, 200, data);
  } catch (error) {
    return respone(res, 500, error);
  }
};

movies.getPage = async (req, res) => {
  try {
    const par = req.query;
    // const body = req.body;
    const data = await model.getDataPage(par);
    res.send(data);
  } catch (error) {
    res.send('Maaf error terjadi');
  }
};

movies.Create = async (req, res) => {
  try {
    console.log(req.users);

    let image = '';
    if (req.file !== undefined) {
      image = req.file.path;
    }

    const { title, year } = req.body;
    const tambah = await model.addData({ title, year, image });
    res.send(tambah);
  } catch (error) {
    console.log(error);
    res.send('Maaf error terjadi di ctrl');
  }
};

movies.Update = async (req, res) => {
  try {
    const body = req.body;
    const tambah = await model.updateData(body);
    res.send(tambah);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

movies.Delete = async (req, res) => {
  try {
    const body = req.body;
    const tambah = await model.deleteData(body);
    res.send(tambah);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

movies.Search = async (req, res) => {
  try {
    const par = req.query;
    const tambah = await model.searchData(par);
    res.send(tambah);
  } catch (error) {
    res.send('Can not find film!');
  }
};

movies.ShowByNameYear = async (req, res) => {
  try {
    const tambah = await model.dataByNameYear();
    res.send(tambah);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

module.exports = movies;

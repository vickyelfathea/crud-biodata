const model = require('../models/schedules');
const schedules = {};

schedules.getAll = async (req, res) => {
  try {
    const data = await model.getData();
    res.send(data);
  } catch (error) {
    res.send('Maaf error terjadi');
  }
};

schedules.Create = async (req, res) => {
  try {
    const body = req.body;
    const tambah = await model.addData(body);
    res.send(body);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

schedules.Update = async (req, res) => {
  try {
    const body = req.body;
    const tambah = await model.updateData(body);
    res.send(body);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

schedules.Delete = async (req, res) => {
  try {
    const body = req.body;
    const tambah = await model.deleteData(body);
    res.send(body);
  } catch (error) {
    res.send('Maaf error terjadi di ctrl');
  }
};

// movies.Search = async (req, res) => {
//   try {
//     const body = req.body;
//     const tambah = await model.searchData(body);
//     res.send(tambah);
//   } catch (error) {
//     res.send("Maaf error terjadi di ctrl");
//   }
// };

// movies.ShowByNameYear = async (req, res) => {
//   try {
//     const tambah = await model.dataByNameYear();
//     res.send(tambah);
//   } catch (error) {
//     res.send("Maaf error terjadi di ctrl");
//   }
// };

module.exports = schedules;

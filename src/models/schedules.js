const db = require('../configs/db');
const models = {};

models.getData = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.schedules ORDER BY schedules_id ASC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.addData = function ({ movie_title, cinema, date }) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO public.schedules
    (movie_title, cinema, "date")
    VALUES($1, $2, $3);
    `,
      [movie_title, cinema, date]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.updateData = function ({ schedules_id, movie_title, cinema, date }) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.schedules
        SET movie_title=$2, cinema=$3, "date"=$4
        WHERE schedules_id=$1;
        `,
      [schedules_id, movie_title, cinema, date]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.deleteData = function ({ movie_title }) {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM public.schedules
        WHERE movie_title=$1;
        `,
      [movie_title]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.searchData = function ({ title }) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.movies WHERE title=$1', [title])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.dataByNameYear = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.movies ORDER BY title, year ASC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

module.exports = models;

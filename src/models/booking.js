const db = require('../configs/db');
const models = {};

models.getData = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.booking ORDER BY booking_id ASC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.addData = function ({ movie_title, schedule, seat }) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO public.booking
      (movie_title, schedule, seat)
      VALUES($1, $2, $3)`,
      [movie_title, schedule, seat]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.updateData = function ({ booking_id, movie_title, schedule, seat }) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.booking
        SET movie_title=$2, schedule=$3, seat=$4
        WHERE booking_id=$1;
        `,
      [booking_id, movie_title, schedule, seat]
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
      `DELETE FROM public.booking
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

module.exports = models;

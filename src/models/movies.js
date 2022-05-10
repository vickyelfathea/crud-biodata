const db = require('../configs/db');
const models = {};

models.getRole = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.users ORDER BY id DESC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.getData = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.movies ORDER BY id DESC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.getDataPage = function ({ page }) {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * 5;
    db.query('SELECT * FROM public.movies ORDER BY id ASC LIMIT 5 OFFSET $1', [
      offset,
    ])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.addData = function ({ title, year, image }) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO public.movies
    (title, year, image)
    VALUES($1, $2, $3);
    `,
      [title, year, image]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.updateData = function ({ id, title, year, director, actors, synopsis }) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.movies
        SET title=$2, "year"=$3, director=$4, actors=$5, synopsis=$6
        WHERE id=$1;
        `,
      [id, title, year, director, actors, synopsis]
    )
      .then((data) => {
        resolve('data: berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.deleteData = function ({ title }) {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM public.movies
        WHERE title=$1;
        `,
      [title]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.deleteImage = function ({ title }) {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM public.movies
        WHERE title=$1;
        `,
      [title]
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
        const [{ id, title, year, director, actors, synopsis }] = data.rows;
        if (id) {
          const print = `Film has found\n\nID Film: ${id}\nNama Film: ${title}\nTahun rilis: ${year}\nSutradara: ${director}\nAktor: ${actors}\nSinopsis: ${synopsis} `;
          resolve(print);
        } else {
          resolve('Can not find film');
        }
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

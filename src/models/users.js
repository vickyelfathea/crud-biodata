const db = require('../configs/db');
const models = {};

models.searchData = function (id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.users WHERE user_id=$1', [id])
      .then((data) => {
        const [{ display_image }] = data.rows;
        if (display_image) {
          const print = `Image path has found ${display_image} `;
          resolve(display_image);
        } else {
          resolve('Display image already deleted');
        }
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.dbDelete = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.users
        SET display_image=NULL
        WHERE user_id=$1;
        `,
      [id]
    )
      .then((data) => {
        if (id) {
          resolve('display image berhasil dihapus');
        } else {
          resolve('Can not find film');
        }
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.Update = function (id, displayImage) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.users
    SET display_image=$2
    WHERE user_id=$1;
    `,
      [id, displayImage]
    )
      .then((data) => {
        resolve('data berhasil disimpan');
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.getData = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.users ORDER BY user_id DESC')
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        reject(ers);
      });
  });
};

models.getByUsername = function (users) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.users WHERE username = $1', [users])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        console.log(ers);
        reject(ers);
      });
  });
};

models.getRole = function (users) {
  return new Promise((resolve, reject) => {
    db.query('SELECT role FROM public.users WHERE username = $1', [users])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        console.log(ers);
        reject(ers);
      });
  });
};

models.addData = function ({ username, hashPassword, role, displayImage }) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO public.users
      (username, "password", created_at, update_at, role, display_image)
      VALUES($1, $2, now(), now(), $3, $4);    
    `,
      [username, hashPassword, role, displayImage]
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

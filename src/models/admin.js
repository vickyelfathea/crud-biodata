const db = require('../configs/db');
const models = {};

models.searchData = function (id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM public.user WHERE id=$1', [id])
      .then((data) => {
        const [{ pasfoto }] = data.rows;
        if (pasfoto) {
          const print = `Image path has found ${pasfoto} `;
          resolve(pasfoto);
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
      `UPDATE public.user
        SET display_image=NULL
        WHERE id=$1;
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
      `UPDATE public.user
    SET display_image=$2
    WHERE id=$1;
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
    db.query('SELECT * FROM public.admin ORDER BY id DESC')
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
    db.query('SELECT * FROM public.user WHERE username = $1', [users])
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
    db.query('SELECT role FROM public.user WHERE username = $1', [users])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((ers) => {
        console.log(ers);
        reject(ers);
      });
  });
};

models.addData = function ({ email, hashPassword, role }) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO public.admin
      (email, "password", role)
      VALUES($1, $2, $3);    
    `,
      [email, hashPassword, role]
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

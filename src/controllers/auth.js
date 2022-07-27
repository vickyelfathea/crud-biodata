const models = require('../models/users');
const respone = require('../helpers/respone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function genToken(username, role) {
  const payload = {
    user: username,
    role: role,
  };

  const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 6000 });

  return {
    token,
    msg: 'token berhasil dibuat',
  };
}

async function Login(req, res) {
  try {
    const password_db = await models.getByUsername(req.body.email);
    if (password_db.length == 0) {
      return respone(res, 200, 'email tidak terdaftar');
    }

    const [{ role }] = await models.getRole(req.body.email);

    if (password_db.length <= 0) {
      return respone(res, 200, 'Email tidak terdaftar');
    }

    const password_user = req.body.password;
    const check = await bcrypt.compare(password_user, password_db[0].password);

    if (check) {
      const token = genToken(req.body.username, role);
      return respone(res, 200, token);
    } else {
      return respone(res, 200, 'password salah');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = Login;

const pool = require('../db/db').pool;

let User = {
  insertUser: function insertUser(params, cb) {
    let query = 'INSERT INTO user (email, password, nickname) VALUES (?,?,?);';
    let insertItem = [
      params.email,
      params.password,
      params.nickname
    ];
    pool.query(query, insertItem, function(err) {
      cb(err);
    });
  },
  getUserByEmail: function getUserByEmail(email, cb) {
    let query = 'SELECT * FROM user WHERE email=?';
    let queryItem = email;
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows);
    });
  },
  getUsers: function getUsers(params, cb) {
    cb(null, {});
  },
  getUser: function getUser(params, cb) {
    let user = {
      id: params.id,
      name: 'user1'
    };
    cb(null, user);
  }
};

module.exports = User;

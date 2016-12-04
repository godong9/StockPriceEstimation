const pool = require('../db/db').pool;

let User = {
  getUserByFacebookId: function getUser(fbId, cb) {
    let query = 'SELECT id FROM users WHERE fb_id=?';
    let queryItem = fbId;
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows && rows[0]);
    });
  },
  insertFacebookUser: function insertUser(params, cb) {
    let query = 'INSERT INTO users (fb_id, nickname, email, profile_img) VALUES (?,?,?,?);';
    let insertItem = [
      params.fbId,
      params.nickname,
      params.email,
      params.profileImg
    ];
    pool.query(query, insertItem, function(err) {
      cb(err);
    });
  },
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

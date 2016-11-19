const _ = require('underscore');

let SessionService = {
  hasSession: function hasSession(req) {
    return (!_.isUndefined(req.session) && !_.isUndefined(req.session.userId))
  },
  getSession: function getSession(req) {
    return {
      userId: req.session.userId,
      userNickname: req.session.userNickname
    }
  },
  getSessionUserId: function getSessionUserId(req) {
    return req.session.userId;
  },
  setSession: function setSession(req, user) {
    req.session.userId = user.id;
    req.session.userNickname = user.nickname;
  },
  removeSession: function removeSession(req) {
    req.session.destroy();
  }
};

module.exports = SessionService;


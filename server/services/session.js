'use strict';

const _ = require('underscore');

let SessionService = {
  hasSession: function hasSession(req) {
    return (!_.isUndefined(req.user) && !_.isUndefined(req.user.id))
  },
  getSession: function getSession(req) {
    return req.user;
  },
  getSessionUserId: function getSessionUserId(req) {
    return req.user.userId;
  }
};

module.exports = SessionService;


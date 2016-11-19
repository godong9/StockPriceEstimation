//main.js
define([
  './libs/jquery/dist/jquery',
  './utils/http-util'
], function (
  $,
  HttpUtil
) {
  'use strict';

  function MainPage() {
    this.init();
  }

  MainPage.prototype.init = function() {
    this.bindHandlers();
  };

  MainPage.prototype.bindHandlers = function() {
    $('#login_btn').click(function() {
      var params = {
        email: $('#email').val(),
        password: $('#password').val()
      };
      HttpUtil.postData('/users/login', params, function(err) {
        if (err) {
          return alert(err);
        }
        console.log("Success");
        location.href = '/predictions';
      });
    });
  };

  return new MainPage();
});
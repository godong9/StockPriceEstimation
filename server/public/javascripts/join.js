//main.js
define([
  './libs/jquery/dist/jquery',
  './utils/http-util'
], function (
  $,
  HttpUtil
) {
  'use strict';

  function JoinPage() {
    this.init();
  }

  JoinPage.prototype.init = function() {
    this.bindHandlers();
  };

  JoinPage.prototype.bindHandlers = function() {
    $('#register_btn').click(function() {
      var params = {
        email: $('#email').val(),
        password: $('#password').val(),
        nickname: $('#nickname').val()
      };
      HttpUtil.postData('/users/register', params, function(err) {
        if (err) {
          return alert(err);
        }
        alert("회원 가입이 완료되었습니다. 메일 인증을 해주세요.");
        console.log("Success");

        location.href = '/';
      });
    });
  };

  return new JoinPage();
});
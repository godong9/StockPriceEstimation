//prediction.js
define([
  './libs/jquery/dist/jquery',
  './utils/http-util'
], function (
  $,
  HttpUtil,
) {
  'use strict';

  function PredictionPage() {
    this.init();
  }

  PredictionPage.prototype.init = function() {
    var self = this;
    var params = {};
    if (localStorage.getItem('prediction321') !== '1') {
      params.stockId = 321; // 삼성전자
      localStorage.setItem('prediction321', '1');
    } else if (localStorage.getItem('prediction1516') !== '1') {
      params.stockId = 1516; // 카카오
      localStorage.setItem('prediction1516', '1');
    }

    HttpUtil.getData('/stocks/random', params, function(err, data) {
      self.stock = data;
      $('#stock_title_text').text(data.kor_name);
      $('#stock_price_text').text(data.price_text);
      if (params.stockId === 321) {
        console.log('삼성전자');
        $('body').attr("style", "background-image: url('/images/main_samsung_bg.png')");
      } else if (params.stockId === 1516) {
        console.log('카카오');
        $('body').attr("style", "background-image: url('/images/main_kakao_bg.png')");
      }
    });

    this.bindHandlers();
  };

  PredictionPage.prototype.bindHandlers = function() {
    var self = this;
    $('#up_btn').click(function() {
      $(this).attr('src', '/images/button_up_select.png');
      $(this).css('height', '120%').css('margin-top', '0%');
      $('#down_btn').unbind();
      var params = {
        willUp: 1,
        todayPrice: self.stock.price
      };
      HttpUtil.postData('/predictions/' + self.stock.id, params, function(err, data) {
        if (err) {
          return alert(err);
        }
        console.log("Success");
        $('.next-item-btn').trigger('click');
      });
    });

    $('#down_btn').click(function() {
      $(this).attr('src', '/images/button_down_select.png');
      $(this).css('height', '120%');
      $('#up_btn').unbind();
      var params = {
        willUp: 0,
        todayPrice: self.stock.price
      };
      HttpUtil.postData('/predictions/' + self.stock.id, params, function(err, data) {
        if (err) {
          return alert(err);
        }
        console.log("Success");
        $('.next-item-btn').trigger('click');
      });
    });

    $('.next-item-btn').click(function() {
      console.log('next');
      location.reload();
    });

    $('#stat_btn').click(function() {
      location.href = '/stats';
    });
  };

  return new PredictionPage();
});
//stat.js
define([
  './libs/jquery/dist/jquery',
  './libs/underscore/underscore',
  './libs/numeral/numeral',
  './utils/http-util',
], function (
  $,
  _,
  numeral,
  HttpUtil
) {
  'use strict';

  function StatPage() {
    this.init();
  }

  StatPage.prototype.init = function() {
    this.bindHandlers();
    $('#tap_option_up').trigger('click');
  };

  StatPage.prototype.bindHandlers = function() {
    var self = this;
    $('#tap_option_up').click(function() {
      var willUp = 1;
      $('#tap_option_up').addClass('active');
      $('#tap_option_down').removeClass('active');
      HttpUtil.getData('/predictions/stat/list/' + willUp, {}, function(err, data) {
        makeStatData(data);
        console.log(data);
        self.draw(data);
      });
    });

    $('#tap_option_down').click(function() {
      var willUp = 0;
      $('#tap_option_down').addClass('active');
      $('#tap_option_up').removeClass('active');
      HttpUtil.getData('/predictions/stat/list/' + willUp, {}, function(err, data) {
        makeStatData(data);
        console.log(data);
        self.draw(data);
      });
    });

    function makeStatData(data) {
      _.every(data, function(stat) {
        stat.text = stat.kor_name;
        stat.count = stat.stat_count;
        stat.price_text = numeral(stat.today_price).format('0,0') + '원';
        stat.stat_count_text = stat.stat_count + '명 예측';
        return stat;
      });
    }
  };

  StatPage.prototype.draw = function(data) {
    d3.select("svg").remove();
    var bubbleChart = new d3.svg.BubbleChart({
      supportResponsive: true,
      //container: => use @default
      size: 600,
      //viewBoxSize: => use @default
      innerRadius: 600 / 3.5,
      //outerRadius: => use @default
      radiusMin: 50,
      //radiusMax: use @default
      //intersectDelta: use @default
      //intersectInc: use @default
      //circleColor: use @default
      data: {
        items: data,
        eval: function (item) {return item.count;},
        classed: function (item) {return item.text.split(" ").join("");}
      },
      plugins: [
        {
          name: "lines",
          options: {
            format: [
              {// Line #0
                textField: "text",
                classed: {count: true},
                style: {
                  "font-size": "18px",
                  "text-anchor": "middle",
                  fill: "white"
                },
                attr: {
                  dy: "-10px",
                  x: function (d) {return d.cx;},
                  y: function (d) {return d.cy;}
                }
              },
              {// Line #1
                textField: "price_text",
                classed: {text: true},
                style: {
                  "font-size": "14px",
                  "text-anchor": "middle",
                  fill: "white"
                },
                attr: {
                  dy: "10px",
                  x: function (d) {return d.cx;},
                  y: function (d) {return d.cy;}
                }
              },
              {
                textField: "stat_count_text",
                classed: {text: true},
                style: {
                  "font-size": "12px",
                  "text-anchor": "middle",
                  fill: "white"
                },
                attr: {
                  dy: "30px",
                  x: function (d) {return d.cx;},
                  y: function (d) {return d.cy;}
                }
              }
            ],
            centralFormat: [
              {// Line #0
                style: {"font-size": "50px"},
                attr: {dy: "-30px"}
              },
              {// Line #1
                style: {"font-size": "40px"},
                attr: {dy: "30px"}
              },
              {
                style: {"font-size": "25px"},
                attr: {dy: "90px"}
              }
            ]
          }
        }]
    });
  };

  return new StatPage();
});
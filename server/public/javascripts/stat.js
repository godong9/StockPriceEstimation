//stat.js
define([
  './libs/jquery/dist/jquery',
  './libs/underscore/underscore',
  './libs/numeral/numeral',
  './libs/d3/d3',
  './utils/http-util'
], function (
  $,
  _,
  numeral,
  d3,
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
        stat.id = stat.kor_name;
        stat.value = stat.stat_count;
        stat.text = stat.kor_name;
        stat.count = stat.stat_count;
        stat.price_text = numeral(stat.today_price).format('0,0') + '원';
        stat.stat_count_text = stat.stat_count + '명 예측';
        return stat;
      });
    }
  };

  StatPage.prototype.draw = function(data) {
    $('svg').css({
      'width': $('#stat_canvas').width() + 'px',
      'height': $('#stat_canvas').height() + 'px'
    });

    var svg = d3.select("svg"),
      width = +$("svg").width();

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var pack = d3.pack()
      .size([width, width])
      .padding(1.5);

    var root = d3.hierarchy({children: data})
      .sum(function(d) { return d.value; })
      .each(function(d) {
        if (id = d.data.id) {
          var id, i = id.lastIndexOf(".");
          d.id = id;
          d.package = id.slice(0, i);
          d.class = id.slice(i + 1);
        }
      });

    var node = svg.selectAll(".node")
      .data(pack(root).leaves())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.package); });

    node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

    node.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .selectAll("tspan")
      .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
      .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

    node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });


  };

  return new StatPage();
});
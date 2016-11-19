//stat.js
define([
  './libs/jquery/dist/jquery'
], function (
  $
) {
  'use strict';

  function RankingPage() {
    this.init();
  }

  RankingPage.prototype.init = function() {
    this.bindHandlers();
  };

  RankingPage.prototype.bindHandlers = function() {
    var self = this;

  };

  return new RankingPage();
});
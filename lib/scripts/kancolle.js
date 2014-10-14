// Description
//   A Hubot script that show kancolle card
//
// Configuration:
//   None
//
// Commands:
//   hubot kancolle - show kancolle card
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var Iconv, cheerio, iconv, images, request, url;
  request = require('request');
  cheerio = require('cheerio');
  Iconv = require('iconv').Iconv;
  iconv = new Iconv('EUC-JP', 'UTF-8//TRANSLIT//IGNORE');
  images = [];
  url = 'http://wikiwiki.jp/kancolle/?艦娘カード一覧';
  request({
    url: url
  }, function(err, _, body) {
    var $, imgs;
    if (err != null) {
      return res.send(err);
    }
    $ = cheerio.load(iconv.convert(body).toString());
    imgs = $('img');
    return imgs.each(function() {
      var img;
      img = $(this);
      if (img.attr('title').match(/^\d+:.+$/)) {
        return images.push(img.attr('src'));
      }
    });
  });
  return robot.respond(/kancolle$/i, function(res) {
    return res.send(res.random(images));
  });
};

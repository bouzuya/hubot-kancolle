# Description
#   A Hubot script that show kancolle card
#
# Configuration:
#   None
#
# Commands:
#   hubot kancolle - show kancolle card
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request'
  cheerio = require 'cheerio'
  {Iconv} = require 'iconv'

  iconv = new Iconv('EUC-JP', 'UTF-8//TRANSLIT//IGNORE')

  images = []
  url = 'http://wikiwiki.jp/kancolle/?艦娘カード一覧'
  request
    url: url
  , (err, _, body) ->
    return res.send(err) if err?
    $ = cheerio.load iconv.convert(body).toString()
    imgs = $ 'img'
    imgs.each ->
      img = $ @
      if img.attr('title').match /^\d+:.+$/
        images.push img.attr('src')

  robot.respond /kancolle$/i, (res) ->
    res.send res.random images

var qiniu = require('qiniu');
var utils = require('./utils');
var watermark = {};

watermark.getLink1 = function(link, jiyouA, jiyouB) {
    jiyouA = utils.sliceName(jiyouA);
    jiyouB = utils.sliceName(jiyouB);

    var defaultColor = 'black',
        defaultSize = 500,
        defaultFont = '微软雅黑';

    var jiyouAArr = jiyouA.split('');
    var jiyouBArr = jiyouB.split('');

    var watermarkA = '',
        watermarkB = '';
    //text, font, fontsize, fill, dissolve, gravity, dx, dy
    var watermarkA0 = watermark.fill(jiyouAArr[0], defaultFont, defaultSize, defaultColor, 100, 'NorthEast', 100, 100),
        watermarkA1 = watermark.fill(jiyouAArr[1], defaultFont, defaultSize, defaultColor, 100, 'NorthEast', 100, 100),
        watermarkB0 = watermark.fill(jiyouBArr[0], defaultFont, defaultSize, defaultColor, 100, 'NorthEast', 100, 100),
        watermarkB1 = watermark.fill(jiyouBArr[1], defaultFont, defaultSize, defaultColor, 100, 'NorthEast', 100, 100);

    return link + '?' + watermarkA0 + '|' + watermarkA1 + '|' + watermarkB0 + '|' + watermarkB1;
}


watermark.fill = function(text, font, fontsize, fill, dissolve, gravity, dx, dy) {
    var watermark = 'watermark/2/text/',
        safe64 = qiniu.util.urlsafeBase64Encode;
    if (text) {
        watermark += safe64(text);
    } else {
        return false;
    }
    if (font) {
        watermark += '/font/' + safe64(font);
    }
    if (fontsize) {
        watermark += '/fontsize' + fontsize;
    }
    if (fill) {
        watermark += '/fill/' + safe64(fill);
    }
    if (dissolve) {
        watermark += '/dissolve/' + dissolve;
    }
    if (gravity) {
        watermark += '/gravity/' + gravity;
    }
    if (dx) {
        watermark += '/dx/' + dx;
    }
    if (dy) {
        watermark += '/dy/' + dy;
    }
    return watermark;
}


module.exports = watermark;

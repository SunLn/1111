var express = require('express');
var config = require('./config');
var qiniu = require('qiniu');
var http = require('http');

var router = express.Router();

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: '双十一搞基不寂寞'
    });
});

router.post('/gaoji', function(req, res, next) {

    var jiyouA = req.param('jiyou-a');
    var jiyouB = req.param('jiyou-b');
    if (jiyouA == '' || jiyouB == '') {
        res.json({
            error: 'invailed args'
        });
    }


    jiyouA = qiniu.util.urlsafeBase64Encode(jiyouA);
    jiyouB = qiniu.util.urlsafeBase64Encode(jiyouB);

    var getOriginLink = function() {
        return {
            link: 'gaoji1111.qiniudn.com/origin/01.jpeg',
            order: 1
        }
    };
    var originInfo = getOriginLink();
    var order = originInfo.order;
    var link = originInfo.link;

    var watermarkA = '',
        watermarkB = '',
        fullLink = '';


    switch (order) {
        case 1:
            watermarkA = 'watermark/2/text/' + jiyouA + '/font/5a6L5L2T/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10';
            watermarkB = 'watermark/2/text/' + jiyouB + '/font/5a6L5L2T/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/NorthEast/dx/10/dy/10';
            fullLink = link + '?' + watermarkA + '|' + watermarkB;

            break;
        case 2:
            break;
        default:
            break;
    }

    var key = generateKey(link, order);
    var newEntryURI = config.Bucket_Name + ':' + key;
    console.log(newEntryURI)
    fullLink = fullLink + '|saveas/' + qiniu.util.urlsafeBase64Encode(newEntryURI);
    console.log(fullLink);
    // res.json({
    //     status: 'ok',
    //     imgLink: fullLink
    // });
    // 在图片中随机选择一张图
    // 种下cookie，下一次根据cookie排除这张已经生成的图
    // 若cookie 已满，再随机生成图片
    // 根据图片需要控制文字对应的位置、文字数量
    // 生成唯一的文件名

    var sign = qiniu.util.hmacSha1(fullLink, config.SECRET_KEY)
    var signUrl = 'http://' + fullLink + '/sign/' + config.ACCESS_KEY + ':' + qiniu.util.base64ToUrlSafe(sign);

    console.log(signUrl);
    var outer_res = res;

    http.get(signUrl, function(res) {
        console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {
            outer_res.json({
                status: 'ok',
                imgLink: config.Domain + '/' + key
            });
        } else {
            outer_res.json({
                ok: 'not ok'
            });
        }
    }).on('error', function(e) {
        outer_res.json({
            ok: 'not ok'
        });
        console.log("Got error: " + e.message);
    });

});

function generateKey(link, order) {
    var result = '',
        length = '15',
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var fileType = link.split('.').pop() || 'jpg';
    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    result = order + '/' + result + new Date().getTime() + '.' + fileType;
    return result;
};

module.exports = router;

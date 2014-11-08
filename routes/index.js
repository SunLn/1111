var express = require('express');
var config = require('./config');
var qiniu = require('qiniu');
// var http = require('http');

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
    res.json({
        status: 'ok'
    })

    // 在图片中随机选择一张图
    // 种下cookie，下一次根据cookie排除这张已经生成的图
    // 若cookie 已满，再随机生成图片
    // 根据图片需要控制文字对应的位置、文字数量
    // 生成唯一的文件名

    // var prefix = 'html/';
    // var name = resource.split('/').pop().split('.')[0] + '.html';
    // var newKey = prefix + name;
    // var newEntryURI = config.Bucket_Name + ':' + newKey;

    // resource = resource + '?md2html/' + mode + '/style/' + qiniu.util.urlsafeBase64Encode(style);
    // resource = resource + '|saveas/' + qiniu.util.urlsafeBase64Encode(newEntryURI);

    // var sign = qiniu.util.hmacSha1(resource, config.SECRET_KEY)
    // var signUrl = 'http://' + resource + '/sign/' + config.ACCESS_KEY + ':' + qiniu.util.base64ToUrlSafe(sign);
    // var outer_res = res;

    // http.get(signUrl, function(res) {
    //     console.log("Got response: " + res.statusCode);
    //     if (res.statusCode == 200) {
    //         outer_res.json({
    //             sign: signUrl,
    //             resource: config.Domain + '/' + newKey
    //         });
    //     } else {
    //         outer_res.json({
    //             ok: 'not ok'
    //         });
    //     }
    // }).on('error', function(e) {
    //     console.log("Got error: " + e.message);
    // });

});

module.exports = router;

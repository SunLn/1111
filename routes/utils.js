var utils = {};

utils.sliceName = function(jiyou) {
    if (jiyou.length > 2) {
        return jiyou.slice(1, 2);
    }
    return jiyou;
}

module.exports = utils;

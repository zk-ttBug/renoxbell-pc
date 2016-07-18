module.exports = function () {
    console.log('foo.js');
    bindEvent();
};

function bindEvent(){
    $('#fbbtn').bind('click',function(){
        shareFb({
            "link": 'http://renoxbell.com',
            "text": '雷诺贝尔',
            "content": '雷诺贝尔',
            "picture": 'http://renoxbell.com/s/uae/g/06/res/xinruilego/c/head/img/logo_703c3fd.png'
        }, {
            "appId": '319966315057697',
            "fbUrl": "https://www.facebook.com/dialog/feed",
            "callback": 'http://renoxbell.com',
            "host": 'http://renoxbell.com'
        });
    });

    $('#twbtn').bind('click',function(){
        shareTw({
            "link":  'http://renoxbell.com',
            "content": "雷罗贝尔官网"
        },{
            "twUrl": "https://twitter.com/intent/tweet?"
        })
    });
}


function shareTw(opt, config) {
    var setting = {
        text: opt.content + '(' + opt.link + ')'
    }
    var twUrl = config.twUrl;
    var shareTW = param(setting, twUrl);
    location.href = shareTW;
}

function shareFb(opt, config) {
    var setting = {};
    setting.link = opt.link || location.protocol + "//www.renoxbell.com";
    setting.name = opt.text || "renoxbell.com";
    setting.description = opt.content || "";
    setting.callback = opt.callback || "";
    setting.app_id = config.appId || ""; // 1663629903854919
    if (opt.picture) {
        setting.picture = opt.picture;
    }
    setting.redirect_uri = config.host;
    var fbUrl = config.fbUrl || location.protocol + "//www.facebook.com/dialog/feed";
    var shareUrl = param(setting, fbUrl);
    location.href = shareUrl;
}


function param(data, appendTo) {
    var stack = [],
        query;

    for (var key in data) {
        stack.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    query = stack.join('&').replace(/%20/g, '+');
    if (typeof appendTo === 'string') {
        query = appendTo + (query.length > 0 ?
            (appendTo.indexOf('?') < 0 ? '?' : '&') + query : '');
    }
    return query;
}
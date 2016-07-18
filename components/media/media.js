module.exports = function () {
    console.log('media!!!');
    var type = 'en';
    if (location.href.indexOf('index_cn') > -1) {
        type = 'cn';
    }
    $.ajax({
        url: NET.SERVER + 'getVideoList',
        type: 'GET',
        data: {
            type: type
        },
        success: function (data) {
            if (data.status === 'success') {
                var items = data.data.list;
                if (items.length > 0) {
                    var obj = items[0];
                    var tmplStr = mediaTmpl(obj);
                    $('#mediaWrap').html(tmplStr);
                }
            } else {
                console.log('media list status error!')
            }
        },
        fail: function (e) {
            console.log('media list ajax error!')
        }
    })
};

function mediaTmpl(item) {
    var mediaArr = [];
    mediaArr.push('<div class="news-top">');
    mediaArr.push('<h3>' + item.title + '</h3>');
    mediaArr.push('</div>');
    mediaArr.push('<div class="news-bottom">');
    mediaArr.push('<div class="vedio-wrap">');
    mediaArr.push('<video src="' + item.file + '" alt="" style="width: 100%" controls="controls"> </video>');
    mediaArr.push('<div class="news-main">');
    mediaArr.push('<h4>' + item.title + '</h4>');
    mediaArr.push('</div>');
    mediaArr.push('</div>');
    mediaArr.push('<div class="clearfix"></div>');
    mediaArr.push('</div>');
    mediaArr.push('<div class="planning">');
    if (location.href.indexOf('index_cn') < 0) {
        mediaArr.push('<p>PRECISE PROJECT PLANNING, MODERN DESIGN AND SATISFYING RESULTS!</p>');
    } else {
        mediaArr.push('<p>精密工程的规划，现代化的设计和令人满意的结果</p>');
    }
    mediaArr.push('</div>');
    var mediaStr = mediaArr.join('');
    return mediaStr;
}
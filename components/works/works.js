module.exports = function () {
    var type = 'en';
    if (location.href.indexOf('index_cn') > -1) {
        type = 'cn';
    }
    $.ajax({
        url: NET.SERVER + 'getFactoryList',
        type: 'GET',
        data: {
            type: type
        },
        success: function (resp) {
            if (resp.status === 'success') {
                var list = resp.data.list;

                if (type == "en") {
                    var tmplStr = projectTmpl(list);
                    $('#work-projects').html(tmplStr);
                } else {
                    var tmplStr = projectTmplCN(list);
                    $('#work-projects').html(tmplStr);
                }
                
                var dialogStr = smallDialogTmpl(list);
                $('#work-small-dialog-panel').html(dialogStr);

                $("#work-projects").responsiveSlides({
                    auto: true,
                    pager: true,
                    nav: false,
                    speed: 500,
                    namespace: "callbacks",
                    before: function () {
                        $('.events').append("<li>before event fired.</li>");
                    },
                    after: function () {
                        $('.events').append("<li>after event fired.</li>");
                    }
                });

                $('.popup-with-zoom-anim').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });
            } else {
                console.log('work-projects list status error!')
            }
        },
        fail: function (e) {
            console.log('work-projects list ajax error!')
        }
    })
};

function projectTmpl(list) {
    var projectHTML = "";
    for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        projectHTML += '<li>' +
            '<div class="work-bottom">' +
                '<div class="col-md-6 work-left">' +
                    '<img src="' + item.image + '" alt="" style="width: 100%">' +
                '</div>' +
                '<div class="col-md-6 work-right">' +
                    '<div class="work-mian">' +
                        '<p>FACTORY NAME<span class="one">: ' + item.title + '</span></p>' +
                        '<p>LOCATION<span class="two">: ' + item.address + '</span></p>' +
                        '<p>OWNER<span class="tre">: ' + item.owner + '</span></p>' +
                        '<p>PROJECT START<span class="fvr">: ' + item.start_time + '</span></p>' +
                        '<p>PROJECT END<span class="fve">: ' + item.end_time + '</span></p>' +
                    '</div>' +
                    '<div class="work-one">' +
                        '<p>DESCRIPTION<label>:</label><span>' + item.desc + '</span>' +
                        '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="clearfix"></div>' +
            '</div>' +
        '</li>';
    }
    return projectHTML;
}

function projectTmplCN(list) {
    var projectHTML = "";
    for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        item.image = "/s/uae/g/06/res/xinruilego/v/lib/images/pro3.jpg";
        projectHTML += '<li>' +
            '<div class="work-bottom">' +
                '<div class="col-md-6 work-left">' +
                    '<img src="' + item.image + '" alt="" style="width: 100%">' +
                '</div>' +
                '<div class="col-md-6 work-right">' +
                    '<div class="work-mian">' +
                        '<p>项目名称<span class="one">: ' + item.title + '</span></p>' +
                        '<p>地址<span class="two">: ' + item.address + '</span></p>' +
                        '<p>所有者<span class="tre">: ' + item.owner + '</span></p>' +
                        '<p>开始日期<span class="fvr">: ' + item.start_time + '</span></p>' +
                        '<p>结束日期<span class="fve">: ' + item.end_time + '</span></p>' +
                    '</div>' +
                    '<div class="work-one">' +
                        '<p>项目描述<label>:</label><span>' + item.desc + '</span>' +
                        '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="clearfix"></div>' +
            '</div>' +
        '</li>';
    }
    return projectHTML;
}

function smallDialogTmpl(list) {
    var dialogHTML = "";
    for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        item.image = "/s/uae/g/06/res/xinruilego/v/lib/images/pro3.jpg";
        dialogHTML += '<div id="small-dialog' + i + '" class="mfp-hide">' +
            '<div class="login">' +
                '<img src="' + item.image + '" alt="" style="width: 100%"/>' +
            '</div>' +
        '</div>';
    }
    return dialogHTML;
}
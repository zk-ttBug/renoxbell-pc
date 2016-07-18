module.exports = function () {
    var type = 'en';
    if (location.href.indexOf('index_cn') > -1) {
        type = 'cn';
    }
    $.ajax({
        url: NET.SERVER + 'getProjectList',
        type: 'GET',
        data: {
            type: type
        },
        success: function (resp) {
            if (resp.status === 'success') {
                var list = resp.data.list;
                var tmplStr = projectTmpl(list);
                $('#owl-projects').html(tmplStr);
                $('#example1 a').Chocolat();
                $("#owl-projects").owlCarousel({
                    items: 5,
                    lazyLoad: true,
                    autoPlay: true,
                    pagination: false
                });
            } else {
                console.log('projects list status error!')
            }
        },
        fail: function (e) {
            console.log('projects list ajax error!')
        }
    })
};

function projectTmpl(list) {
    var projectHTML = "";
    for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        projectHTML += '<div class="item">' +
            '<a href="' + item.image + '" title="Home" rel="title1">' +
                '<img class="lazyOwl" data-src="' + item.image + '" alt="name">' +
            '</a>' +
            '<div class="project-name">' +
                '<p>' + item.title + '</p>' +
                '<span> </span>' +
            '</div>' +
        '</div>';
    }
    return projectHTML;
}
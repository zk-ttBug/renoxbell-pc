module.exports = function () {
    var type = 'en';
    if (location.href.indexOf('index_cn') > -1) {
        type = 'cn';
    }
    $.ajax({
        url: NET.SERVER + 'getProductList',
        type: 'GET',
        data: {
            type: type
        },
        success: function (resp) {
            if (resp.status === 'success') {
                var list = resp.data.list;
                var tmplStr = productTmpl(list);
                $('#productPanel').html(tmplStr);
            } else {
                console.log('productList list status error!')
            }
        },
        fail: function (e) {
            console.log('productList list ajax error!')
        }
    })
};

function productTmpl(list) {
    var productHTML = "";
    for (var i = 0; i < Math.min(4, list.length); ++i) {
        var item = list[i];
        productHTML += '<a class="col-md-3 design-left product-item" href="/detail.html?productId=' + item.id + '">' +
                '<div class="design-text">' +
                    '<img src="' + item.image1 + '" alt=""/>' +
                '</div>' +
            '</a>';
        }
    productHTML += '<div class="clearfix"></div>';
    return productHTML;
}
(function(){
    fetchCategories(function(resp) {
        fetchProducts(resp.data[0]);
    });

    function fetchCategories(callback) {
        $.ajax({
            url: NET.SERVER + 'getCategoryList',
            type:'GET',
            data: {
                type: "en"
            },
            success: function(resp) {
                if (resp.status === 'success') {
                    var list = resp.data;
                    var categoryHTML = "";
                    for (var i = 0; i < list.length; ++i) {
                        categoryHTML += '<div id="' + list[i] + '" class="pro-tag ' + (i == 0? "active" : "") + '">' + list[i] + '</div>';
                    }
                    $("#categoryPanel").html(categoryHTML);

                    bindEvent();

                    callback && callback(resp);        
                } else {
                    console.log('product list status error!');
                }
            },
            fail: function(e) { 
                console.log('product list ajax error!');
            }
        });
    }

    function fetchProducts(type) {
        $.ajax({
            url: NET.SERVER + 'getProductList',
            type:'GET',
            data: {
                type: "en",
                category: type
            },
            success: function(resp) {
                if (resp.status === 'success') {
                    var list = resp.data.list;
                    var productHTML = "";
                    for (var i = 0, len = list.length; i < len; i+=4) {
                        var item = list[i];
                        productHTML += '<div class="pro-wrap">';
                        for (j = i; j < i + 4; ++j) {
                            if (j < len) {
                                productHTML += '<div class="pro-list-item">' +
                                    '<a href="/detail.html?productId=' + item.id + '">' +
                                        '<img src="' + item.imagesThumb[0] + '">' +
                                        '<div class="pro-name">' + item.name +'</div>' +
                                    '</a>' + 
                                '</div>';
                            }
                        }
                        productHTML += '</div>';
                    }
                    productHTML += '</div>';
                    $("#productList").html(productHTML);        
                } else {
                    console.log('product list status error!');
                }
            },
            fail: function(e) { 
                console.log('product list ajax error!');
            }
        });
    }

    function bindEvent(){
        $('.pro-tag').bind('click',function(e){
            var isAct = $(e.srcElement).hasClass('active');
            if(isAct){
                return;
            }else{
                $('.active').removeClass('active');
                $(e.target).addClass('active');
                var tId = $(e.target).attr('id');
                fetchProducts(tId);
            }
        })
    }

})()
(function(){
	var productId = getUrlParams().productId;

	function getUrlParams() {
		var params = {};
	    var search = location.search;
	    var kvs = search.substr(1).split("&");
	    for (var i = 0, len = kvs.length; i < len; ++i) {
	        var kvstr = kvs[i];
	        var kv = kvstr.split("=");
	        params[kv[0]] = kv[1];
	    }
	    return params;
	}

	function init() {
		var jssor_1_options = {
            $AutoPlay: false,
            $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $TransitionsOrder: 1
            },
            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
            },
            $ThumbnailNavigatorOptions: {
                $Class: $JssorThumbnailNavigator$,
                $Cols: 10,
                $SpacingX: 8,
                $SpacingY: 8,
                $Align: 360
            }
        };

        var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizing
        function ScaleSlider() {
            var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
            if (refSize) {
                refSize = Math.min(refSize, 526);
                jssor_1_slider.$ScaleWidth(refSize);
            }
            else {
                window.setTimeout(ScaleSlider, 30);
            }
        }
        ScaleSlider();
        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
        //responsive code end

        setTimeout(hideURLbar, 0);

     	function hideURLbar() {
	        window.scrollTo(0, 1);
	    }

	    $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
        });

        var pull = $('#pull');
        menu = $('nav ul');
        menuHeight = menu.height();
        $(pull).on('click', function (e) {
            e.preventDefault();
            menu.slideToggle();
        });
        $(window).resize(function () {
            var w = $(window).width();
            if (w > 320 && menu.is(':hidden')) {
                menu.removeAttr('style');
            }
        });
	}

    function bindEvent(data){
        $('#fbbtn').bind('click',function(){
            shareFb({
                "link": location.href,
                "text": data.name,
                "content": data.desc,
                "picture": data["image" + 0]
            }, {
                "appId": '319966315057697',
                "fbUrl": "https://www.facebook.com/dialog/feed",
                "callback": location.href,
                "host": 'http://renoxbell.com'
            });
        });
        $('#twbtn').bind('click',function(){
            shareTw({
                "link":  location.href,
                "content": data.name
            },{
                "twUrl": "https://twitter.com/intent/tweet?"
            })
        });
        $('#more-btn').bind('click',function(){
            location.href='/procenter.html';
        })
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

	function getProductDetail() {
        $.ajax({
            url: NET.SERVER + 'getProductDetail',
            type:'GET',
            data: {
                type: "en",
                id: productId
            },
            success: function(resp) {
                if (resp.status === 'success') {
                	var data = resp.data;
                	var productDetailHTML = "";
                	for (var i = 0; i < data.imagesThumb.length; ++i) {
                        if (data.images && data.imagesThumb) {
                            productDetailHTML += '<div data-p="144.50" style="display: none;">' +
                                '<img data-u="image" src="' + data.images[i] + '" />' +
                                '<img data-u="thumb" src="' + data.imagesThumb[i] + '" />' +
                            '</div>';
                        }
                	}
                    $("#pdSlider").html(productDetailHTML);     

                    var projectDetailInfoHTML = "";
                    projectDetailInfoHTML += '<div class="detail-title">' + data.name + '</div>';
                    projectDetailInfoHTML += '<div class="detail-desc">' + data.desc + '</div>'

                    if (data.spaces) {
                        projectDetailInfoHTML += '<div class="detail-line" style="margin-top: 34px">' +
                                                '<span class="detail-li-title">SPAECS</span>';
                        var spaces = data.spaces.split(",");
                        for (var i = 0; i < spaces.length; ++i) {
                            projectDetailInfoHTML += '<span class="detail-size">' + spaces[i] + '</span>';
                        }
                        projectDetailInfoHTML += '</div>';
                    }
                    
                    if (data.model) {
                        projectDetailInfoHTML += '<div class="detail-line" style="margin-top: 34px">' +
                                                '<span class="detail-li-title">MODEL</span>';
                        var model = data.model.split(",");
                        for (var i = 0; i < model.length; ++i) {
                            projectDetailInfoHTML += '<span class="detail-size">' + model[i] + '</span>';
                        }
                        projectDetailInfoHTML += '</div>';
                    }

                    if (data.nw) {
                        projectDetailInfoHTML += '<div class="detail-line" style="margin-top: 34px">' +
                                                '<span class="detail-li-title">N.W</span>';
                        var nw = data.nw.split(",");
                        for (var i = 0; i < nw.length; ++i) {
                            projectDetailInfoHTML += '<span class="detail-size">' + nw[i] + '</span>';
                        }
                        projectDetailInfoHTML += '</div>';
                    }

			       	$("#pdInfo").html(projectDetailInfoHTML);

                    var prodcutDetailImgsHTML = "";

                    for (var k = 0; k < data.detailImages.length; ++k) {
                            prodcutDetailImgsHTML += '<div class="detail-bg-png">' +
                                '<img src="' + data.detailImages[k] + '">' +
                            '</div>';
                    }

                    $("#detailPanel").html(prodcutDetailImgsHTML);
                    bindEvent(data);
                    init();
                } else {
                    console.log('get product detail status error!');
                }
            },
            fail: function(e) { 
                console.log('get product detail ajax error!');
            }
        });
	}

	getProductDetail();

})();
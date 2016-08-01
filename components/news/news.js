module.exports = function () {
    var type = 'en';
    if(location.href.indexOf('index_cn')>-1){
        type = 'cn';
    }
    $.ajax({
        url: NET.SERVER + 'getNewsList',
        type:'GET',
        data:{
            type:type
        },
        success:function(data){
            if(data.status === 'success'){
                var items = data.data.list;
                var contentStr = newsTempl(items,type);
                $('#top2').html(contentStr);
            }else{
                console.log('news list status error!')
            }
        },
        fail:function(e){
            console.log('news list ajax error!')
        }
    })
};

/***
 * 初始化模板内容
 * @param items
 * @returns {string}
 */
function newsTempl(items,type){
    var url = '/newsinfo.html';
    if(type==='cn'){
        url = '/newsinfo_cn.html';
    }
    var newsarr = [];
    for(var i = 0;i<items.length;i++){
        var data = items[i];
        newsarr.push('<a href="'+url+'?id='+data.id+'" class="news-item">');
        newsarr.push('<img class="news-img" src="'+data.bannerImage+'" />');
        newsarr.push('<div class="news-title">'+data.title+'</div>');
        newsarr.push("<div class='news-content-info'>"+data.desc+"</div>");
        newsarr.push('</a>');
    }
    var newsStr = newsarr.join('');
    return newsStr;
}
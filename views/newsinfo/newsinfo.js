
function initNewsInfo(){
    if(location.href.split('?') && location.href.split('?')[1] && location.href.split('?')[1].split('=') && location.href.split('?')[1].split('=')[1]){
        var infoId = location.href.split('?')[1].split('=')[1];
        $.ajax({
            url: NET.SERVER + 'getNewsDetail',
            type:'GET',
            data:{
                id:infoId,
                type:'en'
            },
            success:function(data){
                if(data.status === 'success'){
                    var obj = data.data;
                    var tmplStr = getNewsInfoTempl(obj);
                    $('#newsinfoDetail').append(tmplStr);
                }else{
                    console.log('news Info status error!')
                }
            },
            fail:function(e){
                console.log('news Info ajax error!')
            }
        })
    }
}
initNewsInfo();


function getNewsInfoTempl(data){
    var newsArr = [];
    newsArr.push('<div class="newsinfo-title">'+data.title+'</div>');
    newsArr.push('<div class="newsinfo-date">'+data.last_modify+'</div>');
    newsArr.push('<div class="newsinfo-text">');
    newsArr.push('<p>'+data.content+'</p>');
    newsArr.push('</div>');

    var newsStr = newsArr.join('');
    return newsStr;
}
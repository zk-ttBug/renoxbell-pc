module.exports = function () {
    console.log('qq.js');
    bindEvent();
};

function bindEvent(){
    myEvent(window,'load',function(){
        dealy('qq_icon',0);						//2秒后显示QQ图标，默认为2秒，可自行设置
        settop('qq_icon','cs_online',150);		//设置在线客服的高度，默认150，可自行设置
        var span_q = getbyClass('cs_online','qq_num');
        setqq(span_q,['2567117841','1274955423']);		//填写2个QQ号码
        click_fn('qq_icon','cs_online');
    });
}

/* download by http://www.sucaijiayuan.com */
function myEvent(obj,ev,fn){
    if (obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }else{
        obj.addEventListener(ev,fn,false);
    };
};
function getbyClass(id,sClass){
    var oParent = document.getElementById(id);
    var all = oParent.getElementsByTagName('*');
    var array = [];
    for (var i=0; i<all.length; i++){
        if (all[i].className == sClass){
            array.push(all[i]);
        };
    };
    return array;
};
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    };
};
function Running(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var now=0;
        var bStop=true;
        for (var attr in json){
            if(attr=='opacity'){
                now=Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                now=parseInt(getStyle(obj,attr));
            };
            var speed=(json[attr]-now)/5;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(now!=json[attr])bStop=false;
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+now+speed+')';
                obj.style.opacity=(now+speed)/100;
            }else{
                obj.style[attr]=speed+now+'px';
            };
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();
        }
    }, 30);
}
function Flexing(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var now=0;
        var bStop=true;
        for (var attr in json){
            if(!obj.speed)obj.speed={};
            if(!obj.speed[attr])obj.speed[attr]=0;
            now=parseInt(getStyle(obj,attr));
            if(Math.abs(json[attr]-now)>1 || Math.abs(obj.speed[attr])>1){
                bStop=false;
                obj.speed[attr]+=(json[attr]-now)/5;
                obj.speed[attr]*=0.85;
                var MaxSpeed=65;
                if(Math.abs(obj.speed[attr])>MaxSpeed){
                    obj.speed[attr]=obj.speed[attr]>0?MaxSpeed:-MaxSpeed;
                };
                obj.style[attr]=now+obj.speed[attr]+'px';
            };
        };
        if(bStop){
            clearInterval(obj.timer);
            obj.style[attr]=json[attr]+'px';
            if(fnEnd)fnEnd();
        };
    }, 30);
}
function setqq(obj,num){
    if (obj.length!=num.length){
        console.log('\nspan的个数与QQ号码的个数不符，请设置5个QQ号码!\n\n[设置未成功!]');
        //alert('\nspan的个数与QQ号码的个数不符，请设置5个QQ号码!\n\n[设置未成功!]');
        return;
    }else{
        for (var i=0; i<num.length; i++){
            obj[i].innerHTML = "<a target='_blank' href='http://wpa.qq.com/msgrd?V=1&uin="+num[i]+"&exe=qq&Site=qq&menu=yes'><img border='0' src='http://wpa.qq.com/pa?p=2:"+num[i]+":51' alt='点击咨询' title='点击咨询'/></a>";
        };
    };
};
function settop(id,id2,top){
    var obj = document.getElementById(id);
    var box = document.getElementById(id2);
    obj.style.top = box.style.top = top+'px';
};
function dealy(id,time){
    var obj = document.getElementById(id);
    var timer = setTimeout(function(){
        Flexing(obj,{right:-100});
    },time*1000);
};
function click_fn(id,id2){
    var obj = document.getElementById(id);
    var box = document.getElementById(id2);
    obj.onclick = function(){
        Running(obj,{right:-200},function(){
            box.style.display = 'block';
            Running(box,{right:10, opacity:100});
        });
    };
    box.onclick = function(){
        timer = setTimeout(function(){
            Running(box,{right:-220,opacity:0},function(){
                box.style.display = 'none';
                Flexing(obj,{right:-100});
            });
        },3000);
    };
};
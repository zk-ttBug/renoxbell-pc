module.exports = function () {
    console.log('head!!!');
};

/**
 * 显示头部组件
 */
function headShow() {
    document.getElementById('gw-head').style.display = 'block';
}
bindEvent();

function bindEvent() {
    document.getElementById('change-lan').addEventListener('click', function () {
        var isHide = $('.head-choice-item').hasClass('hide');
        if (isHide) {
            $('.head-choice-item').removeClass('hide');
        } else {
            $('.head-choice-item').addClass('hide');
        }
        // console.log('1122');
    })

    $('.head-choice-item').bind('click', function () {
        var toUrl = $('.head-choice-item').attr('dataUrl');
        location.href = toUrl;
    });
}



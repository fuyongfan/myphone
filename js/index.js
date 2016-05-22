
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#main>ul>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
$(function () {
    var viewHeight = $("body").height();
    var $li = $('#list').find('>li');
    //$('#main').css('height', viewHeight);
    slidePage();
    function slidePage() {
        var startY = null;
        var step = 1 / 4;
        var nowIndex = 0;
        var nextOrPrevIndex = 0;
        var bOk = true;
        //绑定touchstart事件
        $li.on('touchstart', function (ev) {
            if (bOk == false) return;

            bOk = false;
            var touch = ev.originalEvent.touches[0];
            startY = touch.pageY;
            nowIndex = $(this).index();
            $li.on('touchmove.move', function (ev) {
                var touch = ev.originalEvent.touches[0];
                $(this).siblings('li').hide();
                if (touch.pageY < startY) {//up
                    nextOrPrevIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                    $li.eq(nextOrPrevIndex).css('transform', 'translate(0,' + (viewHeight + touch.pageY - startY) + 'px)')
                } else if (touch.pageY > startY) {//down
                    nextOrPrevIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                    $li.eq(nextOrPrevIndex).css('transform', 'translate(0,' + (-viewHeight + touch.pageY - startY) + 'px)')
                } else {
                    bOk = true;
                }
                $li.eq(nextOrPrevIndex).addClass('zIndex').show();
            });
            $li.on('touchend.move', function (ev) {
                $li.eq(nextOrPrevIndex).css('transform', 'translate(0,0)');
                $li.eq(nextOrPrevIndex).css('transition', '.3s');
                $li.eq(nowIndex).css('transition', '.3s');
                $li.off('.move');
            })
        });
        $li.on('transitionend webkitTransitionend', function (ev) {
            if (!$li.is(ev.target)) return;
            resetFn();
        });
        function resetFn() {
            $li.css('transform', '');
            $li.css('transition', '');
            $li.eq(nextOrPrevIndex).removeClass('zIndex').siblings('li').hide();
            bOk = true;
        }
    }
});
var musicBtn = document.getElementById("musicBtn");
var musicAudio = document.getElementById("audio1");
window.addEventListener("load", function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "music move";
    }, false);
    musicBtn.addEventListener("touchend", function () {
        if (musicAudio.paused) {
            musicAudio.play();
            musicBtn.className = "music move";
        } else {
            musicAudio.pause();
            musicBtn.className = "music";
        }
    }, false);
}, false);

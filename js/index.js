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
$(document).on('touchmove', function (ev) {
    ev.preventDefault();
});
$(function () {
    var viewHeight = $(window).height();
    var $li = $('#list').find('>li');
    slidePage();
    function slidePage() {
        var startY = null;
        var step = 1 / 4;
        var nowIndex = 0;
        var nextorprevIndex = 0;
        var bOk = true;
        var n = 0;
        $li.on('touchstart', function (ev) {
            if (bOk == false) return;
            bOk = false;
            var touch = ev.originalEvent.touches[0];
            startY = touch.pageY;
            nowIndex = $(this).index();
            $li.on('touchmove.move', function (ev) {
                n++;
                var touch = ev.originalEvent.touches[0];
                $(this).siblings('li').hide();
                if (touch.pageY < startY) {//up
                    nextorprevIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                    $li.eq(nextorprevIndex).css('transform', 'translate(0,' + (viewHeight + touch.pageY - startY) + 'px)')
                } else if (touch.pageY > startY) {//down
                    nextorprevIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                    $li.eq(nextorprevIndex).css('transform', 'translate(0,' + (-viewHeight + touch.pageY - startY) + 'px)')
                } else {
                    bOk = true;
                }
                $(this).css('transform', 'translate(0,' + (touch.pageY - startY) * step + 'px) scale(' + (1 - Math.abs(touch.pageY - startY) / viewHeight * step) + ')');
                $li.eq(nextorprevIndex).addClass('zIndex').show();
            });
            $li.on('touchend.move', function (ev) {
                if (n == 0)return;
                var touch = ev.originalEvent.changedTouches[0];
                if (touch.pageY < startY) {//up
                    $(this).css('transform', 'translate(0,' + (-viewHeight * step) + 'px) scale(' + (1 - step) + ')')
                } else if (touch.pageY > startY) {//down
                    $(this).css('transform', 'translate(0,' + (viewHeight * step) + 'px) scale(' + (1 - step) + ')')
                } else {
                    bOk = true;
                }
                $li.eq(nextorprevIndex).css('transform', 'translate(0,0)');
                $li.eq(nextorprevIndex).css('transition', '.3s');
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
            $li.eq(nextorprevIndex).removeClass('zIndex').siblings('li').hide();
            bOk = true;
        }
    }
});$(function(){
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
});
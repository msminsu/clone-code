var sound;
var mediaModule = (function (window, document, $, undefined) {

    var $subNav = $(".sub_nav").children("li"), $bar = $(".movie_progress").children("li");
    var videoBg = {};
    var videoBgReady = {media1: false, media3: false, media2: false, media4: false, media5: false};
    var idxId, targetNum;

    var init = function() {
        settings();
        controls();
        // moviePlay(0);
    };

    function controls(){
        $(".media_btn_prev").on("click", function(){
            preNext("prev");
        });

        $(".media_btn_next").on("click", function(){
            preNext("next");
        });

        $subNav.on("click", function(){
            resetMovie();
            moviePlay($(this).index());
        });
    }

    function preNext(chk){
        if(chk=="prev"){
            if(targetNum>0){
                resetMovie();
                targetNum = targetNum-1;
                moviePlay(targetNum);
            }else{

            }
        }else if(chk=="next"){
            if(targetNum<Object.keys(videoBg).length-1){
                resetMovie();
                targetNum = targetNum+1;
                moviePlay(targetNum);

            }else{

            }
        }
    }

    function moviePlay(target){
        idxId = $subNav.eq(target).data("id");
        if(videoBgReady[idxId]) {
            videoBg[idxId].play();
            menuControls(target);
            progressBar(target);
            targetNum = target;
            return;
        }
        var checkReady = setInterval(function(){
            videoBgReady[idxId] = videoBg[idxId].state.isReady;
            if(videoBgReady[idxId]) {
                videoBg[idxId].play();
                menuControls(target);
                progressBar(target);
                targetNum = target;
                clearInterval(checkReady);
            }
        }, 100);
    }

    function resetMovie(){
        $.each(videoBg, function(key, value){
            if(value != null) {
                if(value.state.isReady) {
                    value.seek(0);
                    value.pause(0);
                }
            }
        });
    }

    function menuControls(target){
        setTimeout(function(){
            $(window).trigger("resize");
        }, 50);
        TweenMax.to([$(".media_player")], 0.5, {autoAlpha:0, display:"none"});
        TweenMax.to([$(".media_player").eq(target)], 0.5, {autoAlpha:1, display:"block"});
        $subNav.removeClass("on");
        $subNav.eq(target).addClass("on");
    }

    function progressBar(target){
        videoBg[idxId].on('end', function(){
            console.log('player end');
        });
    }

    function settings(){
        videoBg.media1 = new nc.promokit.Player({
            selector: '#media-1',
            videoId: '17ET5STusKg',
            mute: false,
            controls: true,
            coverClick: true
        });

        videoBg.media2 = new nc.promokit.Player({
            selector: '#media-2',
            videoId: 'pa3dJsvyNrI',
            mute: false,
            controls: true,
            coverClick: true
        });

        videoBg.media3 = new nc.promokit.Player({
            selector: '#media-3',
            videoId: 'od7eTzyqyyE',
            mute: false,
            controls: true,
            coverClick: true
        });

        videoBg.media4 = new nc.promokit.Player({
            selector: '#media-4',
            videoId: 'lUhGIVG4EOA',
            mute: false,
            controls: true,
            coverClick: true
        });

        videoBg.media5 = new nc.promokit.Player({
            selector: '#media-5',
            videoId: '9xjvG9Swy-s',
            mute: false,
            controls: true,
            coverClick: true
        });
    };

    return {
        init:init,
        moviePlay:moviePlay,
        resetMovie:resetMovie
    };

})(window, document, $);

let initFlag = true;

const onStart = () => {
    if(sound.soundChk.flag){
        sound.change(false);
        sound.soundChk.flag2 = false;
    }else{
        sound.soundChk.flag2 = true;
    }
    if (initFlag) {
        mediaModule.init();
        initFlag = false;
    }
};
const onComplete = () => {

};

const onAnimation = () => {
    mediaModule.moviePlay(0);
};

const mediaInit = () => {
    mediaModule.init();
};

const mediaResetMovie = (eq) => {
    sound = eq;
    mediaModule.resetMovie();
    if(sound.soundChk.flag==false && sound.soundChk.flag2==false){
        sound.change(true);
    }
};

export default {
    onStart,
    onComplete,
    onAnimation,
    mediaResetMovie,
    mediaInit
};
var rNum;
var sound;


var mainVideoBg = {};
var mainVideoBgReady = {mainMovie: false, layerMovie: false};


var main = {
    mainMotion1: new TimelineMax({paused: true}),
    mainMotion2: new TimelineMax({paused: true})
}

var setMotion = {
    motion1: function () {
        main.mainMotion1
            .to($(".cht_gon_wrap"), 0.66, {alpha: 1})
            .from($(".btn_play"), 0.62, {y: 150, alpha: 0, ease: Power3.easeOut}, "-=0.36")
            .from($(".nowupdate"), 0.62, {y: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".scroll_txt"), 0.66, {y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".cht_gon"), 0.62, {x: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".gon_fire1"), 0.4, {x: 60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.1")
            .from($(".gon_fire2"), 0.4, {x: -60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.4")
            .from($(".gon_fire3"), 0.4, {x: 150, alpha: 0, ease: Power3.easeOut}, "-=0.4")
            .staggerFrom(
                $(".etc_menu>li")
                , 0.35, {x: 60, alpha: 0, ease: Circ.easeOut}, 0.1, "-=0.4");
    },
    motion2: function () {
        main.mainMotion2
            .to($(".cht_jin_wrap"), 0.66, {alpha: 1})
            .from($(".btn_play"), 0.62, {y: 150, alpha: 0, ease: Power3.easeOut}, "-=0.36")
            .from($(".nowupdate"), 0.62, {y: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".scroll_txt"), 0.66, {y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".cht_jin"), 0.62, {x: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
            .from($(".jin_fire1"), 0.4, {x: 60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.1")
            .from($(".jin_fire2"), 0.4, {x: -60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.4")
            .from($(".jin_fire3"), 0.4, {x: 150, alpha: 0, ease: Power3.easeOut}, "-=0.4")
            .from($(".jin_lightning"), 1.2, {height: 0, ease: Power4.easeOut}, "-=0.1")
            .staggerFrom(
                $(".etc_menu>li")
                , 0.35, {x: 60, alpha: 0, ease: Circ.easeOut}, 0.1, "-=0.4");
    }
}


// mainMotion1.to($(".cht_gon_wrap"), 0.66, {alpha: 1})
//     .from($(".main_tit"), 0.64, {x: -220, y: 220, alpha: 0, ease: Power3.easeOut}, "+=1.0")
//     .from($(".main_stit"), 0.64, {x: 220, y: 220, alpha: 0, ease: Power3.easeOut}, "-=0.64")
//     .from($(".btn_play"), 0.62, {y: 150, alpha: 0, ease: Power3.easeOut}, "-=0.36")
//     .from($(".btn_preorder"), 0.62, {y: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".scroll_txt"), 0.66, {y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".cht_gon"), 0.62, {x: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".gon_fire1"), 0.4, {x: 60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.1")
//     .from($(".gon_fire2"), 0.4, {x: -60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.4")
//     .from($(".gon_fire3"), 0.4, {x: 150, alpha: 0, ease: Power3.easeOut}, "-=0.4")
//     .staggerFrom(
//         $(".etc_menu>li")
//         , 0.35, {x: 60, alpha: 0, ease: Circ.easeOut}, 0.1, "-=0.4");


// mainMotion2.to($(".cht_jin_wrap"), 0.66, {alpha: 1})
//     .from($(".main_tit"), 0.64, {x: -220, y: 220, alpha: 0, ease: Power3.easeOut}, "+=1.0")
//     .from($(".main_stit"), 0.64, {x: 220, y: 220, alpha: 0, ease: Power3.easeOut}, "-=0.64")
//     .from($(".btn_play"), 0.62, {y: 150, alpha: 0, ease: Power3.easeOut}, "-=0.36")
//     .from($(".btn_preorder"), 0.62, {y: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".scroll_txt"), 0.66, {y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".cht_jin"), 0.62, {x: 120, alpha: 0, ease: Power3.easeOut}, "-=0.3")
//     .from($(".jin_fire1"), 0.4, {x: 60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.1")
//     .from($(".jin_fire2"), 0.4, {x: -60, y: 60, alpha: 0, ease: Power3.easeOut}, "-=0.4")
//     .from($(".jin_fire3"), 0.4, {x: 150, alpha: 0, ease: Power3.easeOut}, "-=0.4")
//     .from($(".jin_lightning"), 1.2, {height: 0, ease: Power4.easeOut}, "-=0.1")
//     .staggerFrom(
//         $(".etc_menu>li")
//         , 0.35, {x: 60, alpha: 0, ease: Circ.easeOut}, 0.1, "-=0.4");


var init = function () {
    setVideo();
    moviePlay("mainMovie");

    $(".btn_play").on("click", function () {
        movieLayer("open");
        if(sound.soundChk.flag){
            sound.change(false);
            sound.soundChk.flag2 = false;
        }else{
            sound.soundChk.flag2 = true;
        }
    });

    $(".moovie_close").on("click", function () {
        if(sound.soundChk.flag==false && sound.soundChk.flag2==false){
            sound.change(true);
        }
        movieLayer("close");
    });
};

function movieLayer(stateChk) {
    if (stateChk == "open") {
        $(".layer_movie").fadeIn();
        moviePlay("layerMovie");
        mainVideoBg.mainMovie.pause();
        $(window).trigger('resize');
    } else if (stateChk == "close") {
        mainVideoBg.layerMovie.seek(0);
        mainVideoBg.layerMovie.pause(0);
        mainVideoBg.mainMovie.play();
        $(".layer_movie").fadeOut();
    }
}

function randomNumber(min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}

function moviePlay(idxId) {
    if (mainVideoBgReady[idxId]) {
        mainVideoBg[idxId].play();
        return;
    }
    var checkReady = setInterval(function () {
        mainVideoBgReady[idxId] = mainVideoBg[idxId].state.isReady;
        if (mainVideoBgReady[idxId]) {
            mainVideoBg[idxId].play();
            clearInterval(checkReady);
        }
    }, 100);
}

function setVideo() {
    mainVideoBg.mainMovie = new nc.promokit.Player({
        selector: '#main-1',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/main_BG_low.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    });

    mainVideoBg.layerMovie = new nc.promokit.Player({
        selector: '#movieBox',
        videoId: 'pa3dJsvyNrI',
        mute: false,
        autoPlay: false,
        controls: true,
        loop: true
    });
}

function resetMovie() {
    $.each(mainVideoBg, function (key, value) {
        if (value != null) {
            if (value.state.isReady) {
                value.seek(0);
                value.pause(0);
            }
        }
    });
}


const onStart = (eq) => {
    sound = eq;
};

const onComplete = () => {

};

let initAnimation = false;

var sequence1 = new nc.promokit.Sequenceplayer({
    el: '#sequence-player-1',
    path: 'https://wstatic-cdn.plaync.com/promo/bns/history/2018/180607_warrior/img/sequence',
    frame: 145,
    autoPlay: false,
    fps: 30
});

sequence1.on('play', function(){
    main[`mainMotion${rNum + 1}`].seek(0);
    main[`mainMotion${rNum + 1}`].pause(0);

    setTimeout(() => {
        main[`mainMotion${rNum + 1}`].play();
    }, 3000);
});

const onAnimation = () => {
    $(window).trigger("resize");
    mainVideoBg.mainMovie.play();

    sequence1.stop();

    if (rNum > -1) {
        if (!initAnimation) {
            initAnimation = true;
            setMotion[`motion${rNum + 1}`]();
        }else{
            main[`mainMotion${rNum + 1}`] && main[`mainMotion${rNum + 1}`].seek(0);
            main[`mainMotion${rNum + 1}`] && main[`mainMotion${rNum + 1}`].pause(0);
        }
    }
    else{
        rNum = randomNumber(0, 1);
        if (!initAnimation) {
            initAnimation = true;
            setMotion[`motion${rNum + 1}`]();
        }else{
            main[`mainMotion${rNum + 1}`] && main[`mainMotion${rNum + 1}`].seek(0);
            main[`mainMotion${rNum + 1}`] && main[`mainMotion${rNum + 1}`].pause(0);
        }
    }

    setTimeout(() => {
        sequence1.play();
    }, 2000)
};

const mainResetMovie = () => {
    mainVideoBg.mainMovie && mainVideoBg.mainMovie.pause();
};

const mainInit = () => {
    init();
};

export default {
    onStart,
    onComplete,
    onAnimation,
    mainResetMovie,
    mainInit
};
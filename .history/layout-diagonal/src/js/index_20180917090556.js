import main from './page/main';
import warrior from './page/warrior';
import contents from './page/contents';
import media from './page/media';

new nc.promokit.Preloader({
    'game': 'bns',
    'delay': 1000,
    'image': [
        './src/img/common/btn_play.png',
        './src/img/common/footer_bg.png',
        './src/img/common/gnb_list.png',
        './src/img/common/header_etc_bg.png',
        './src/img/common/logo.png',
        './src/img/common/remote_menu_bg.png',
        './src/img/main/cht_gon.png',
        './src/img/main/cht_jin.png',
        './src/img/main/gon_fire1.png',
        './src/img/main/gon_fire2.png',
        './src/img/main/gon_fire3.png',
        './src/img/main/jin_fire1.png',
        './src/img/main/jin_fire2.png',
        './src/img/main/jin_fire3.png',
        './src/img/main/jin_lightning.png',
        './src/img/main/main_tit.png',
        './src/img/contents/thumb1_bg_off.jpg',
        './src/img/contents/thumb1_bg_on.jpg',
        './src/img/contents/thumb2_bg_off.jpg',
        './src/img/contents/thumb2_bg_on.jpg',
        './src/img/contents/thumb3_bg_off.jpg',
        './src/img/contents/thumb3_bg_on.jpg',
        './src/img/contents/layer1_bg.jpg',
        './src/img/contents/layer2_bg.jpg',
        './src/img/contents/layer3_bg.jpg',
        './src/img/contents/layer1_cht.png',
        './src/img/contents/layer2_cht.png',
        './src/img/contents/layer3_cht.png',
        './src/img/contents/thumb1_cht.png',
        './src/img/contents/thumb2_cht.png',
        './src/img/contents/thumb3_cht.png',
        './src/img/contents/layer1_slide1.jpg',
        './src/img/contents/layer1_slide2.jpg',
        './src/img/contents/layer1_slide3.jpg',
        './src/img/contents/layer2_slide1.jpg',
        './src/img/contents/layer2_slide2.jpg',
        './src/img/contents/layer2_slide3.jpg',
        './src/img/contents/fade_layer1_img1.jpg',
        './src/img/contents/fade_layer1_img2.jpg',
        './src/img/contents/fade_layer1_img3.jpg',
        './src/img/contents/fade_layer2_img1.jpg',
        './src/img/contents/fade_layer2_img2.jpg',
        './src/img/contents/fade_layer2_img3.jpg',
        './src/img/warrior/warrior-combat-bg-1.jpg',
        './src/img/warrior/warrior-combat-bg-1.png',
        './src/img/warrior/warrior-combat-bg-2.png',
        './src/img/warrior/warrior-combat-bg-2-on.png',
        './src/img/warrior/warrior-combat-char-1.png',
        './src/img/warrior/warrior-combat-char-2.png',
        './src/img/warrior/warrior-intro-bg-2.jpg',
        './src/img/warrior/warrior-intro-bg-3.png',
        './src/img/warrior/warrior-intro-char-1.png',
        './src/img/warrior/warrior-intro-char-2.png',
        './src/img/warrior/warrior-intro-char-3.png',
        './src/img/warrior/warrior-stance-bg-2.png',
        './src/img/warrior/warrior-stance-char-1.png',
        './src/img/warrior/warrior-stance-char-2.png',
        './src/img/warrior/warrior-story-char-1.png',
        './src/img/warrior/warrior-stroy-bg.jpg'
    ]
});

const layoutAction = {
    [0]: {context: main, name: 'scene1'},
    [1]: {context: warrior, name: 'scene2'},
    [2]: {context: contents, name: 'scene3'},
    [3]: {context: media, name: 'scene4'},
};

var sceneLayoutIndex;

var sceneBoxControls = (function (window, document, $, undefined) {

    var $list = $(".gnb").children("li");

    var init = function() {
        controls();
        sceneLayoutIndex = new nc.ui.SceneBox({
            selector: '#scene-box',
            render: 0,

            onCompleteCallback () {
                layoutAction[sceneLayoutIndex.detect.state.nowLayout].context.onComplete();
                $list.removeClass("on");
                $list.eq(sceneLayoutIndex.detect.state.nowLayout).addClass("on");
            },
            onStartCallback () {
                layoutAction[sceneLayoutIndex.detect.state.nowLayout].context.onStart(equalizer);
                if(sceneLayoutIndex.detect.state.nowLayout!=3){
                    media.mediaResetMovie(equalizer);
                }
                if(sceneLayoutIndex.detect.state.nowLayout!=2){
                    contents.closeAnimation();
                }
                if(sceneLayoutIndex.detect.state.nowLayout!=0){
                    main.mainResetMovie();
                }
                glaRemote.remoteAct(true);
            },
            onAnimation () {
                layoutAction[sceneLayoutIndex.detect.state.to].context.onAnimation();
            },
        });

    };

    function controls(){
        $list.on("click", function(){
            var target = $(this).index();
            if(sceneLayoutIndex.detect.state.nowLayout==target) return;
            navigation(target);
        });
    }

    function navigation(target){
        sceneLayoutIndex.render(target);
    }

    return {
        init:init
    };

})(window, document, $);

var equalizer = (function (window, document, $, undefined) {

    var $parent, $children, $audio = $("[data-media='audio']"), $btn = $("[data-btn='eq']");
    var url, startSet = true, volume;
    var soundChk = {};

    var init = function(opts) {
        $parent = $(opts.parent), $children = $(opts.children), url = opts.url, volume = opts.volume;
        setEqualizer(opts.setStr);
        $btn.on("click", function(){
            var chk = (soundChk.flag==true) ? false : true ;
            setEqualizer(chk);
        });
    };

    function setEqualizer(str){     // audio 및 animation 관련 기능
        if(str==true){
            $parent.children($children).removeClass("stop");    // equalizer 애니메이션 추가
            setAudio();
            $audio[0].play();   // audio 플레이
            $btn.addClass("on");
            soundChk.flag = str;
        }else{
            $parent.children($children).addClass("stop");    // equalizer 애니메이션 삭제
            setAudio();
            $audio[0].pause();   // audio 일시정지
            $btn.removeClass("on");
            soundChk.flag = str;
        }
    }

    function setAudio(){
        if(startSet==true){
            $audio.append("<source src='"+url+"' type='audio/mpeg' />");
            $audio[0].volume = volume;
            startSet = false;
        }
    }

    return {
        options:init,    // init함수를 options이란 이름으로 외부에서 사용가능
        change:setEqualizer,
        soundChk:soundChk
    };

})(window, document, $);

var glaRemote = (function (window, document, $, undefined) {

    var $btnArrow = $(".btn_arrow"), $remoteWrap = $(".remote_wrap"), $remote = $(".remote_nav").find("li");

    var init = function() {
        $btnArrow.on("click", function(){
            var flag = $remoteWrap.hasClass("on");
            remoteAct(flag);
        });
        // $remote.on("click", function(){
        //     var target = $(this).index();
        //     alertMessage(target);
        // });
    };

    function alertMessage(target){
        if(target==7){
            alert("6월 20일 확인이 가능합니다.");
        }
    }

    function remoteAct(flag){
        if(!flag){
            $remoteWrap.addClass("on");
        }else{
            $remoteWrap.removeClass("on");
        }
    }

    return {
        init:init,
        remoteAct:remoteAct
    };

})(window, document, $);

$(document).on('preloadend', function(){

    new equalizer.options({
        parent:"#equalizer",    // 부모 엘리먼트
        children:"span",    // 자식 엘리먼트
        url:"http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/B&S_Warrior_Trailer_M_Mix.mp3",   // 오디오 url
        volume:0.7,   // 볼륨
        setStr:false    // 이퀄라이저 동작여부(true : play / false : pause)
    });

    main.mainInit();

    // media.mediaInit();

    glaRemote.init();

    sceneBoxControls.init();

});
var expModule = (function (window, document, $, undefined) {

    var interval = 100, initNum = 0, isOpen=true, width = [], timeout, videoBg = {};
    var videoBgReady = {contents1:false, contents2:false};
    var $lis = $(".expand_wrap").children("li"), $close = $(".layer_close");
    var ct0 = new TimelineMax({paused: true}), layer1 = new TimelineMax(), layer2 = new TimelineMax(), layer3 = new TimelineMax();
        ct0.from($(".exp_con1_over"), 0.5, {autoAlpha:0, display:"block"})
        .from($(".thumb1_cht"), 0.66, {x:100, autoAlpha:0, ease:Expo.easeOut}, "-=0.2")
        .from($(".exp_con1_over").find("strong"), 0.66, {y:60, autoAlpha:0, ease:Expo.easeOut}, "-=0.3");
    var ct1 = new TimelineMax({paused: true});
        ct1.from($(".exp_con2_over"), 0.5, {autoAlpha:0, display:"block"})
        .from($(".thumb2_cht"), 0.66, {x:100, autoAlpha:0, ease:Expo.easeOut}, "-=0.2")
        .from($(".exp_con2_over").find("strong"), 0.66, {y:60, autoAlpha:0, ease:Expo.easeOut}, "-=0.3");
    var ct2 = new TimelineMax({paused: true});
        ct2.from($(".exp_con3_over"), 0.5, {autoAlpha:0, display:"block"})
        .from($(".thumb3_cht"), 0.66, {x:100, autoAlpha:0, ease:Expo.easeOut}, "-=0.2")
        .from($(".exp_con3_over").find("strong"), 0.66, {y:60, autoAlpha:0, ease:Expo.easeOut}, "-=0.3");

    var mt = new TimelineMax();

    var init = function(){
        mt.from($(".expand_wrap").children("li").eq(0), 0.6, {scale:0.6, autoAlpha:0, ease:Power3.easeOut}, "+=1.0")
        .from($(".expand_wrap").children("li").eq(1), 0.6, {scale:0.6, autoAlpha:0, ease:Power3.easeOut}, "-=0.52")
        .from($(".expand_wrap").children("li").eq(2), 0.6, {scale:0.6, autoAlpha:0, ease:Power3.easeOut}, "-=0.52");

        setVideo();

        for (var i = 0; i < $lis.length; i++) {
            width[i] = $lis.eq(i).width();
        }

        $lis.on("mouseenter", controls.mouseEnter);
        // $lis.on("mouseleave", controls.mouseLeave);
        $lis.on("click", controls.mouseClick);
        $close.on("click", controls.mouseClose);
    };

    var controls = {
        mouseEnter : function(){
            clearTimeout(timeout);
            controls.target = $(this).index();
            overAct();
        },
        mouseLeave : function(){
            timeout = setTimeout(function () {
                outAct();
            }, 400);
        },
        mouseClick : function(e){
            e.preventDefault();
            clickAct();
        },
        mouseClose : function(){
            closeAct();
        }
    };

    var clickAct = function(){
        if(isOpen==false){
            return;
        }
        if(controls.target!=2){
            $(".contents_layer").find($(".player__context")).css({width:100+"%", height:100+"%", position:"absolute", overflow:"hidden"})
            $(".contents_player").find("video").css({minWidth:100+"%", minHeight:100+"%", width:"", height:""});
            moviePlay(controls.target);
        }
        TweenMax.to([$lis.eq(controls.target)], 0.5, {x:0, y:0, width:"100%", height:"100%", top:0, right:0, bottom:0, left:0, zIndex:5});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.4, {alpha:0});
        TweenMax.to([$lis.eq(controls.target).children(".contents_layer")], 0.5, {autoAlpha:1, display:"block"});
        if (controls.target==0) {
            TweenMax.to([$lis.eq(1)], 0.5, {x:$(window).width() / 2, right:0});
            TweenMax.to([$lis.eq(2)], 0.5, {x:$(window).width() / 2, right:0});
            layerMotion1();
        }else if (controls.target==1) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-$(window).width() / 2, y:$(window).height() / 2, width:$(window).width(), right:0, bottom:0});
            layerMotion2();
        }else if (controls.target==2) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-$(window).width() / 2, y:-$(window).height() / 2, width:$(window).width(), top:0, right:0});
            layerMotion3();
        }
        TweenMax.set([$lis], {zIndex:0});
        isOpen = false;
    };

    var closeAct = function(){
        ct0.reverse().seek(0);
        ct1.reverse().seek(0);
        ct2.reverse().seek(0);
        resetMovie();
        TweenMax.to([$lis.eq(0)], 0.5, {x:0, width: $(window).width() / 2, left:0});
        TweenMax.to([$lis.eq(1)], 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:0, right:0, bottom:"50%", left:"50%"});
        TweenMax.to([$lis.eq(2)], 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:"50%", right:0, bottom:0, left:"50%"});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.4, {alpha:1, scale:1.3});
        TweenMax.to([$lis.eq(controls.target).children(".contents_layer")], 0.5, {autoAlpha:0, display:"block"});
        setTimeout(function(){
            isOpen = true;
            $lis.each(function(i){
                TweenMax.set($(this), {x:0, y:0, width:"", height:"", top:"", right:"", bottom:"", left:""});
            });
        }, 400);
    }

    var overAct = function(){
        if(isOpen==false){
            return;
        }
        if (controls.target==0) {
            ct0.play().timeScale(1);
            ct1.reverse().timeScale(2.5);
            ct2.reverse().timeScale(2.5);
            TweenMax.to([$lis.eq(0)], 0.5, {x:interval, left:-interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:interval, y:initNum, top:initNum, right:interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:interval, y:initNum, right:interval, bottom:initNum});
        }else if (controls.target==1) {
            ct0.reverse().timeScale(2.5);
            ct1.play().timeScale(1);
            ct2.reverse().timeScale(2.5);
            TweenMax.to([$lis.eq(0)], 0.5, {x:-interval, left:interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-interval, y:interval, top:-interval, right:-interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-interval, y:interval, right:-interval, bottom:interval});
        }else if (controls.target==2) {
            ct0.reverse().timeScale(2.5);
            ct1.reverse().timeScale(2.5);
            ct2.play().timeScale(1);
            TweenMax.to([$lis.eq(0)], 0.5, {x:-interval, left:interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-interval, y:-interval, top:interval, right:-interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-interval, y:-interval, right:-interval, bottom:-interval});
        }
        TweenMax.to([$lis.children(".exp_bg")], 0.5, {scale:1.3});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.5, {scale:1});
    };

    var outAct = function(){
        ct0.reverse().timeScale(2.5);
        ct1.reverse().timeScale(2.5);
        ct2.reverse().timeScale(2.5);
        closeAct();
    }

    var layerMotion1 = function(){
        layer1.from($(".layer1_cht"), 0.7, {x:400, autoAlpha:0, ease:Power4.easeOut}, "+=0.6")
        .from($(".layer1_fx1"), 0.66, {x:200, autoAlpha:0, ease:Power4.easeOut}, "-=0.4")
        .from($(".layer1_fx2"), 1.0, {x:600, y:50, autoAlpha:0, ease:Power4.easeOut}, "-=0.45")
        .from($(".layer1_tit"), 0.66, {y:200, autoAlpha:0, ease:Power4.easeOut}, "-=0.9")
        .from($("#sliderGallery1"), 0.66, {x:-200, autoAlpha:0, ease:Power4.easeOut}, "-=0.4");
    }

    var layerMotion2 = function(){
        layer2.from($(".layer2_cht"), 0.7, {y:200, autoAlpha:0, ease:Power4.easeOut}, "+=0.6")
        .from($(".layer2_tit"), 0.66, {y:200, autoAlpha:0, ease:Power4.easeOut}, "-=0.5")
        .from($("#sliderGallery2"), 0.66, {x:-200, autoAlpha:0, ease:Power4.easeOut}, "-=0.2");
    }

    var layerMotion3 = function(){
        layer3.from($(".layer3_cht"), 0.7, {y:200, autoAlpha:0, ease:Power4.easeOut}, "+=0.6")
        .from($(".layer3_tit_bg"), 0.66, {x:-200, autoAlpha:0, ease:Power4.easeOut}, "-=0.4")
        .from($(".layer3_tit"), 0.66, {y:150, autoAlpha:0, ease:Power4.easeOut}, "-=0.37")
        .from($(".layer3_stit"), 0.66, {y:150, autoAlpha:0, ease:Power4.easeOut}, "-=0.4");
    }

    function moviePlay(target){
        var idxId = $(".expand_wrap").children("li").eq(target).data("id");
        if(videoBgReady[idxId]) {
            videoBg[idxId].play();
            return;
        }
        var checkReady = setInterval(function(){
            videoBgReady[idxId] = videoBg[idxId].state.isReady;
            if(videoBgReady[idxId]) {
                videoBg[idxId].play();
                clearInterval(checkReady);
            }
        }, 100);
    }

    function setVideo(){
        videoBg.contents1 = new nc.promokit.Player({
            selector: '#contents-1',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/contents_01_low.mp4',
            mute:true,
            autoPlay:false,
            loop:true
        });

        videoBg.contents2 = new nc.promokit.Player({
            selector: '#contents-2',
            videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/contents_02_low.mp4',
            mute:true,
            autoPlay:false,
            loop:true
        });
    };

    function resetMovie(){
        $.each(videoBg, function(key, value){
            if(value != null) {
                if(value.state.isReady) {
                    value.seek(0);
                    value.pause();
                }
            }
        });
    }

    return{
        init : init,
        closeAct:closeAct
    };

})(window, document, $);

var sliderModule = (function (window, document, $, undefined) {

    var $btn = $("[data-btn]"),
        $wrap = $("[data-gallery='wrap']"),
        $cover = $("[data-gallery='cover']"),
        $list = $("[data-slider='list']"),
        $paging = $("[data-list='paging']"),
        _pagingWrap = "data-paging='wrap'",
        _paging = "data-paging='list'";


    var init = function(opts){
        $.each(opts.element, function(i, item) {
            var obj     = {};
            obj.element  = item;
            obj.idx = opts.idx[i];
            obj.len = $(item).find($list).length;
            obj.paging = opts.paging[i];
            if(opts.pelement != undefined){
                obj.pelement = opts.pelement[i];
            }
            obj.setChk = true;

            var first = $(obj.element).find($list).first($list).clone();
            var last = $(obj.element).find($list).last($list).clone();
            $(obj.element).find($wrap).append(first);
            $(obj.element).find($wrap).prepend(last);

            sliderAnimation(obj);
            controls(obj);
        });
    };

    function controls(obj){
        $(obj.element).find($btn).off().on("click", function(e){
            var target = $(this).data("btn");
            prevnext(obj, target);
        });

        $(obj.element).find("["+_paging+"]").on("click", function(e){
            var thisNum = $(this).index();
            obj.idx = thisNum+1;
            sliderAnimation(obj);
        });

        $(obj.element).find(".icon_expand").on("click", function(e){
            fade.action($(this).data("name"), obj.idx-1);
        });

        $(obj.pelement).find($paging).on("click", function(e){
            var thisNum = $(this).index();
            obj.idx = thisNum+1;
            sliderAnimation(obj);
        });
    };

    function prevnext(obj, target){
        if($(obj.element).find($wrap).is(":not(:animated)")){
            if(target=="next"){
                obj.idx = obj.idx+1;
                sliderAnimation(obj);
            }else if(target=="prev"){
                obj.idx = obj.idx-1;
                sliderAnimation(obj);
            }
        }
    };

    function sliderAnimation(obj){
        if(obj.setChk==true){
            obj.idx = (obj.idx>obj.len || obj.idx<=0) ? 1 : obj.idx;
            $(obj.element).find($wrap).css({left:-$(obj.element).find($cover).width()*obj.idx});
            if(obj.paging==true){
                pagingSet(obj);
                sliderPaging(obj);
            }
            obj.setChk = false;
        }else{
            $(obj.element).find($wrap).stop().animate({left:-$(obj.element).find($cover).width()*obj.idx}, function(){
                var cycle = (0===obj.idx || obj.len+1===obj.idx);
                if(cycle){
                    obj.idx = (obj.idx === 0)? obj.len : 1;
                    $(obj.element).find($wrap).css({left:-$(obj.element).find($cover).width()*obj.idx});
                }
                if(obj.paging==true){
                    sliderPaging(obj);
                }
            });
        }
    }

    function sliderPaging(obj){
        $(obj.element).find($("["+_paging+"]")).removeClass("on");
        $(obj.element).find($("["+_paging+"]")).eq(obj.idx-1).addClass("on");
    }

    function pagingSet(obj){
        $(obj.element).append("<ul "+_pagingWrap+">");
        for ( var i=1 ; i<obj.len+1 ; i++ ){
            $(obj.element).find($("["+_pagingWrap+"]")).append("<li "+_paging+"><button type='button'>"+i+"");
        }
    }

    return{
        option:init
    };
})(window, document, $);

var fadeModule = (function(){
    var $btnPrev = $(".fade_prev"),
        $btnNext = $(".fade_next"),
        $fadeWrap = $(".fade_wrap")
    var state = {};

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($(this.opts.element), function(i, item){
                context.controls(item);
                state.idx = context.opts.idx[i];
                state.len = $(item).find($fadeWrap).find("li").length;
                // context.action(item, context.opts.idx[i]);
            });
        },
        controls : function(element){
            var context = this;
            $(element).find($btnPrev).on("click", function(e){
                var num = state.num-1;
                if(num>=0){
                    context.action(element, num);
                }
            });

            $(element).find($btnNext).on("click", function(e){
                var num = state.num+1;
                if(num<state.len){
                    context.action(element, num);
                }
            });

            $(element).find(".fade_close").on("click", function(e){
                $(element).fadeOut(300);
            });
        },
        action : function(element, num){
            $(element).fadeIn(300);
            $(element).find($fadeWrap).find("li").fadeOut(300);
            $(element).find($fadeWrap).find("li").eq(num).fadeIn(300);
            state.num = num;
        }
    };

    return Person;
})();

new sliderModule.option({
    element:["#sliderGallery1", "#sliderGallery2"],
    idx:[1, 1],
    paging:[true, true],
    pelement:["", ""],
});

var fade = new fadeModule({
    element:["#sliderGallery1Pop", "#sliderGallery2Pop"],
    idx:[0, 0]
});

const onStart = () => {

};
const onComplete = () => {

};
const onAnimation = () => {
    expModule.init();
};
const closeAnimation = () => {
    expModule.closeAct();
};

export default {
    onStart,
    onComplete,
    onAnimation,
    closeAnimation
};
const calcSize = (el, deg) =>{
    let container = $('.container');
    let originWidth = container.width();
    let originHeight = container.height();
    let radian = deg * Math.PI / 180;
    let edge = originHeight * Math.tan(radian);
    
    $(el).css({
        'margin-left': -(originWidth + edge) / 2 + 'px',
        'width': (originWidth + edge) + 'px'
    });
};

calcSize('.warrior__info-bg', 19);

$(window).resize(() =>{
    calcSize('.warrior__info-bg', 18);
});

let AREA1 = $('.warrior-ctrl__1');
let AREA2 = $('.warrior-ctrl__2');
let AREA3 = $('.warrior-ctrl__3');
let AREA4 = $('.combat-1');
let AREA5 = $('.combat-2');
let AREA6 = $('.stance-ctrl__1');
let AREA7 = $('.stance-ctrl__2');

let combat1Open = false;
let combat2Open = false;

let stance1Open = false;
let stance2Open = false;

let hoverActive = false;
let now = '';

const introTimeline = new TimelineMax({paused: true});

introTimeline.addLabel('init')
             .to('.warrior .sub_nav', 0.1, {display: 'none', opacity: 0}, 0)
             .to('.warrior__info--1', 1, {ease: Expo.easeInOut, x: 0, y: 0}, 0)
             .to('.warrior__info--3', 1, {ease: Expo.easeInOut, x: 0, y: 0}, 0)
             .to('.warrior__info--2', 1, {ease: Expo.easeInOut, opacity: 1}, 'init+=0.3')
             .to('.warrior__info-text--1', 1, {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=.7')
             .to('.warrior__info-text--2', 1, {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=.8')
             .to('.warrior__info-text--3', 1, {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=.9');

const setLayout = (v1, v2, v3) =>{
    TweenMax.to('.warrior__info--1', '0.6' + (v1[2] || 0), {left: v1[0], right: v1[1], ease: Expo.easeInOut});
    TweenMax.to('.warrior__info--2', '0.6' + (v2[2] || 0), {left: v2[0], right: v2[1], ease: Expo.easeInOut});
    TweenMax.to('.warrior__info--3', '0.6' + (v3[2] || 0), {left: v3[0], right: v3[1], ease: Expo.easeInOut});
    
    TweenMax.to('.warrior-ctrl__1', '0.6' + (v1[2] || 0), {left: v1[0], right: v1[1], ease: Expo.easeInOut});
    TweenMax.to('.warrior-ctrl__2', '0.6' + (v2[2] || 0), {left: v2[0], right: v2[1], ease: Expo.easeInOut});
    TweenMax.to('.warrior-ctrl__3', '0.6' + (v3[2] || 0), {left: v3[0], right: v3[1], ease: Expo.easeInOut});
};

const action1_play = () =>{
    if(!hoverActive) return;
    now = 'story';
    
    setTimeout(() =>{
        if(now !== 'story') return;
        setLayout(['-40%', '40%'], ['60%', '20%'], ['80%', '-80%']);
        TweenMax.fromTo('.warrior__info-char--1-1', 1, {opacity: 0, x: -300, y: 180}, {opacity: .1, x: 0, y: 0, ease: Expo.easeInOut});
        TweenMax.fromTo('.warrior__info-char--1-2', 1, {opacity: 0, x: -300, y: 180}, {opacity: .4, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.05'});
        TweenMax.fromTo('.warrior__info-char--1-3', 1, {opacity: 0, x: -300, y: 180}, {opacity: 1, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.1'});
        TweenMax.to('.warrior__info-text--1', 1, {x: 100, y: -80, ease: Expo.easeInOut, delay: '0.05'});
        action2_reverse();
        action3_reverse();
    }, 100);
};

const action2_play = () =>{
    if(!hoverActive) return;
    now = 'combat';
    
    setTimeout(() =>{
        if(now !== 'combat') return;
        setLayout(['-80%', '80%'], ['20%', '20%'], ['80%', '-80%']);
        TweenMax.fromTo('.warrior__info-char--2-1', 1, {opacity: 0, x: 400, y: -180}, {opacity: .1, x: 0, y: 0, ease: Expo.easeInOut});
        TweenMax.fromTo('.warrior__info-char--2-2', 1, {opacity: 0, x: 400, y: -180}, {opacity: .4, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.05'});
        TweenMax.fromTo('.warrior__info-char--2-3', 1, {opacity: 0, x: 400, y: -180}, {opacity: 1, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.1'});
        TweenMax.to('.warrior__info-text--2', 1, {x: -100, y: -80, ease: Expo.easeInOut, delay: '0.05'});
        action1_reverse();
        action3_reverse();
    }, 100);
};

const action3_play = () =>{
    if(!hoverActive) return;
    now = 'stance';
    
    setTimeout(() =>{
        if(now !== 'stance') return;
        setLayout(['-80%', '80%'], ['20%', '60%'], ['40%', '-40%']);
        TweenMax.fromTo('.warrior__info-char--3-1', 1, {opacity: 0, x: 400, y: 180}, {opacity: .1, x: 0, y: 0, ease: Expo.easeInOut});
        TweenMax.fromTo('.warrior__info-char--3-2', 1, {opacity: 0, x: 400, y: 180}, {opacity: .4, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.05'});
        TweenMax.fromTo('.warrior__info-char--3-3', 1, {opacity: 0, x: 400, y: 180}, {opacity: 1, x: 0, y: 0, ease: Expo.easeInOut, delay: '0.1'});
        TweenMax.to('.warrior__info-text--3', 1, {x: -100, y: -50, ease: Expo.easeInOut, delay: '0.05'});
        action1_reverse();
        action2_reverse();
    }, 100);
};

const action1_reverse = () =>{
    TweenMax.to('.warrior__info-char--1', 1, {opacity: 0, ease: Quint.easeInOut});
    TweenMax.to('.warrior__info-text--1', 1, {x: 0, y: 0, ease: Expo.easeInOut});
};

const action2_reverse = () =>{
    TweenMax.to('.warrior__info-char--2', 1, {opacity: 0, ease: Quint.easeInOut});
    TweenMax.to('.warrior__info-text--2', 1, {x: 0, y: 0, ease: Expo.easeInOut});
};

const action3_reverse = () =>{
    TweenMax.to('.warrior__info-char--3', 1, {opacity: 0, ease: Quint.easeInOut});
    TweenMax.to('.warrior__info-text--3', 1, {x: 0, y: 0, ease: Expo.easeInOut});
};

const resetIndex = () =>{
    setLayout(['-65%', '65%'], ['35%', '35%'], ['65%', '-65%']);
    action1_reverse();
    action2_reverse();
    action3_reverse();
};

const offIndex = () =>{
    $('.warrior-ctrl').hide();
    $('.warrior-info-wrap').hide();
};

const onIndex = () =>{
    $('.warrior-ctrl').show();
    $('.warrior-info-wrap').css({opacity: 1}).show();
};

const playerList = {
    story: new nc.promokit.Player({
        selector: '#story-bg-mov',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/update/warrior/storybg.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    }),
    combat1: new nc.promokit.Player({
        selector: '#combat-1__player',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/warrior_01_low.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    }),
    combat2: new nc.promokit.Player({
        selector: '#combat-2__player',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/warrior/warrior_02_low.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    }),
    stance1: new nc.promokit.Player({
        selector: '#stance-1__player',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/update/warrior/stance-1.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    }),
    stance2: new nc.promokit.Player({
        selector: '#stance-2__player',
        videoId: 'http://vodfile.ncsoft.co.kr/ncvod/plaync/BNS/update/warrior/stance-2.mp4',
        mute: true,
        autoPlay: false,
        loop: true
    })
};

const playMov = (name, players) =>{
    for (let key in players) {
        if(name === key){
            players[name].play();
        } else {
            players[key] && players[key].stop();
        }
    }
};

const stopMov = () =>{
    for (let key in playerList) {
        playerList[key] && playerList[key].stop();
    }
};

const detailToggle = (name) =>{
    $('.warrior__detail').css({'z-index': 1});
    $(name).css({'z-index': 2});
    $(window).resize();
};

const resetAnimation = () =>{
    resetIndex();
    $('.warrior .sub_nav li').removeClass('on');
    
    TweenMax.to('.warrior-info-wrap', '0.6', {opacity: 1, ease: Quint.easeInOut});
    
    $('.warrior__detail--2 .combat-1').removeClass('combat-1--out').css({'z-index': 1});
    $('.warrior__detail--2 .combat-2').removeClass('combat-2--out').css({'z-index': 1});
    
    mainScene.story.seek(0);
    mainScene.story.pause();
    
    detailScene.story.seek(0);
    detailScene.story.pause();
    
    mainScene.combatIntro.seek(0);
    mainScene.combatIntro.pause();
    
    detailScene.combatIntro.seek(0);
    detailScene.combatIntro.pause();
    
    detailScene.combat1.seek(0);
    detailScene.combat1.pause();
    
    detailScene.combat2.seek(0);
    detailScene.combat2.pause();
    
    mainScene.stanceIntro.seek(0);
    mainScene.stanceIntro.pause();
    
    detailScene.stanceIntro.seek(0);
    detailScene.stanceIntro.pause();
    
    detailScene.stance1.seek(0);
    detailScene.stance1.pause();
    
    detailScene.stance2.seek(0);
    detailScene.stance2.pause();
    
    $('.warrior-detail-wrap *').removeAttr('style');
    
    stopMov();
    
    combat1Open = false;
    combat2Open = false;
    stance1Open = false;
    stance2Open = false;
};

const detailScene = {
    story: new TimelineMax({paused: true}),
    storyOut: new TimelineMax({paused: true}),
    combatIntro: new TimelineMax({paused: true}),
    stanceIntro: new TimelineMax({paused: true}),
    combat1: new TimelineMax({paused: true}),
    combat2: new TimelineMax({paused: true}),
    combat3: new TimelineMax({paused: true}),
    combat4: new TimelineMax({paused: true}),
    stance1: new TimelineMax({paused: true}),
    stance2: new TimelineMax({paused: true}),
    stance3: new TimelineMax({paused: true}),
    stance4: new TimelineMax({paused: true})
};

//이야기 상세
detailScene.story.addLabel('init')
           .to('.warrior-info-wrap', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .add(() =>{
               offIndex();
               playMov('story', playerList);
               detailToggle('.warrior__detail--1');
           })
           .to('.warrior__detail--1', 1, {opacity: 1, left: 0, ease: Expo.easeInOut})
           .to('.warrior__detail--1 .story-text__1', '0.8', {opacity: 1, x: -300, ease: Expo.easeInOut}, 'init+=.7')
           .to('.warrior__detail--1 .story-deco', '0.8', {opacity: 1, x: -500, ease: Expo.easeInOut}, 'init+=.75')
           .to('.warrior__detail--1 .story-char', '0.8', {opacity: 1, x: -500, ease: Expo.easeInOut}, 'init+=.75')
           .to('.warrior__detail--1 .story-text__2', '1', {width: '640', ease: Quint.easeInOut}, 'init+=1.6')
           .to('.warrior__detail--1 .story-button', '1', {opacity: 1, ease: Quint.easeOut}, 'init+=2');

//전투방식 인덱스 상세
detailScene.combatIntro.addLabel('init')
           .to('.warrior-info-wrap', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .add(() =>{
               offIndex();
               detailToggle('.warrior__detail--2');
           })
           .to('.warrior__detail--2', 1, {opacity: 1, left: 0, ease: Expo.easeInOut})
           .to('.warrior__detail--2 .combat-1', '0.8', {opacity: 1, left: 0, ease: Expo.easeInOut}, 'init+=.6')
           .to('.warrior__detail--2 .combat-2', '0.8', {opacity: 1, right: 0, ease: Expo.easeInOut}, 'init+=.6')
           .to('.warrior__detail--2 .combat-1__text--1', '1.5', {opacity: 1, x: 0, ease: Bounce.easeOut}, 'init')
           .to('.warrior__detail--2 .combat-2__text--1', '1.5', {opacity: 1, x: 0, ease: Bounce.easeOut}, 'init');

//스텐스 인데스 상세
detailScene.stanceIntro.addLabel('init')
           .to('.warrior-info-wrap', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .add(() =>{
               offIndex();
               detailToggle('.warrior__detail--3');
           })
           .to('.warrior__detail--3', 1, {opacity: 1, left: 0, ease: Expo.easeInOut})
           .to('.warrior__detail--3 .stance-1', '0.8', {opacity: 1, left: 0, ease: Expo.easeInOut}, 'init+=.6')
           .to('.warrior__detail--3 .stance-2', '0.8', {opacity: 1, left: 0, ease: Expo.easeInOut}, 'init+=.6')
           .to('.warrior__detail--3 .stance-1__tit', '0.8', {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=1.3')
           .to('.warrior__detail--3 .stance-1__char', '0.8', {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=.75')
           .to('.warrior__detail--3 .stance-2__tit', '0.8', {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=1.3')
           .to('.warrior__detail--3 .stance-2__char', '0.8', {opacity: 1, x: 0, ease: Expo.easeInOut}, 'init+=.75');

//전투방식 - 강체 in
detailScene.combat1.addLabel('init')
           .add(() =>{
               playMov('combat1', playerList);
               $(window).resize();
           })
           .to('.combat-2', '0.6', {right: '-52%', ease: Expo.easeInOut})
           .to('.warrior__detail--2 .combat-1', '0.6', {width: '100%', ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $(window).resize();
           })
           .to('.warrior__detail--2 .combat-1__char--1', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.2')
           .to('.warrior__detail--2 .combat-1__char--2', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.22')
           .to('.warrior__detail--2 .combat-1__char--3', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.23')
           .to('.warrior__detail--2 .combat-1__text--1', '0.6', {opacity: 0, ease: Expo.easeOut}, 'init')
           .to('.warrior__detail--2 .combat-1__text--2', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=0.5')
           .to('.warrior__detail--2 .combat-1__bg', '0.6', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $('.warrior__detail--2 .combat-1').css({'z-index': 1});
               $('.warrior__detail--2 .combat-2').addClass('combat-2--out').css({'z-index': 2});
           })
           .to('.combat-2', '0.6', {x: '-250', ease: Expo.easeInOut}, 'init+=1')
           .to('.warrior__detail--2 .combat-2__char--1', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-2__char--2', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-2__char--3', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1');

//전투방식 - 투선강림 in
detailScene.combat2.addLabel('init')
           .add(() =>{
               playMov('combat2', playerList);
           })

           .to('.combat-1', '0.6', {left: '-52%', ease: Expo.easeInOut})
           .to('.warrior__detail--2 .combat-2', '0.6', {width: '100%', ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $(window).resize();
           })
           .to('.warrior__detail--2 .combat-2__char--1', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.2')
           .to('.warrior__detail--2 .combat-2__char--2', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.22')
           .to('.warrior__detail--2 .combat-2__char--3', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.23')

           .to('.warrior__detail--2 .combat-2__text--1', '0.6', {opacity: 0, ease: Expo.easeOut}, 'init')
           .to('.warrior__detail--2 .combat-2__text--2', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=0.5')
           .to('.warrior__detail--2 .combat-2__bg', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $('.warrior__detail--2 .combat-2').css({'z-index': 1});
               $('.warrior__detail--2 .combat-1').addClass('combat-1--out').css({'z-index': 2});
           })
           .to('.combat-1', '0.6', {x: '250', ease: Expo.easeInOut}, 'init+=1')
           .to('.warrior__detail--2 .combat-1__char--1', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-1__char--2', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-1__char--3', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1');


//전투방식 - 강체 in 투선강림 out
detailScene.combat3.addLabel('init')
           .to('.combat-2', '0.6', {right: '-100%', x: 0, ease: Expo.easeInOut})
           .to('.combat-1', '0.6', {left: 0, x: 0, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               playMov('combat1', playerList);
           })
           .to('.warrior__detail--2 .combat-1', '0.6', {width: '100%', ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $(window).resize();
           })
           .to('.warrior__detail--2 .combat-1__char--1', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.2')
           .to('.warrior__detail--2 .combat-1__char--2', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.22')
           .to('.warrior__detail--2 .combat-1__char--3', '0.6', {right: 'auto', left: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.23')

           .to('.warrior__detail--2 .combat-1__text--1', '0.6', {opacity: 0, ease: Expo.easeOut}, 'init')
           
           .to('.warrior__detail--2 .combat-1__text--2', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=0.5')
           .to('.warrior__detail--2 .combat-1__bg', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $('.warrior__detail--2 .combat-1').css({'z-index': 1});
               $('.warrior__detail--2 .combat-2').addClass('combat-2--out').css({'z-index': 2});
           })
           .to('.warrior__detail--2 .combat-2__bg', '1', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.warrior__detail--2 .combat-2__text--1', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=1')
           
           .to('.combat-2', '0.6', {x: '-250', ease: Expo.easeInOut}, 'init+=1')
           
           
           .to('.warrior__detail--2 .combat-2__char--1', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-2__char--2', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-2__char--3', '0.1', {left: 'auto', right: '-50%', y: 0, scale: 1}, 'init+=1');


//전투방식 - 투선강림 in 강제 out
detailScene.combat4.addLabel('init')
           .to('.combat-1', '0.6', {left: '-100%', ease: Expo.easeInOut})
           
           .to('.combat-2', '0.6', {right: 0, x: 0, ease: Expo.easeInOut}, 'init')
           
           .add(() =>{
               playMov('combat2', playerList);
           })
           .to('.warrior__detail--2 .combat-2', '0.6', {width: '100%', ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $(window).resize();
           })
           .to('.warrior__detail--2 .combat-2__char--1', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.2')
           .to('.warrior__detail--2 .combat-2__char--2', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.22')
           .to('.warrior__detail--2 .combat-2__char--3', '0.6', {left: 'auto', right: -100, y: -100, scale: 0.8, ease: Expo.easeOut}, 'init+=0.23')

           .to('.warrior__detail--2 .combat-2__text--1', '0.6', {opacity: 0, ease: Expo.easeOut}, 'init')
           .to('.warrior__detail--2 .combat-2__text--2', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=0.5')
           .to('.warrior__detail--2 .combat-2__bg', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               $('.warrior__detail--2 .combat-2').css({'z-index': 1});
               $('.warrior__detail--2 .combat-1').addClass('combat-1--out').css({'z-index': 2});
           })
           .to('.warrior__detail--2 .combat-1__bg', '1', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.warrior__detail--2 .combat-1__text--1', '0.6', {opacity: 1, ease: Expo.easeOut}, 'init+=1')
           
           .to('.combat-1', '0.6', {x: '250', ease: Expo.easeInOut}, 'init+=1')
           
           .to('.warrior__detail--2 .combat-1__char--1', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-1__char--2', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1')
           .to('.warrior__detail--2 .combat-1__char--3', '0.1', {right: 'auto', left: '-50%', y: 0, scale: 1}, 'init+=1');

//전투방식 - 광기 in
detailScene.stance1.addLabel('init')
           .add(() =>{
               playMov('stance1', playerList);
               $('.stance-1').css({'z-index': 1});
               $('.stance-2').css({'z-index': 2});
               $(window).resize();
           })
           .to('.stance-ctrl__1', '0.6', {right: '20%', ease: Expo.easeInOut}, 'init')
           .to('.stance-ctrl__2', '0.6', {left: '80%', ease: Expo.easeInOut}, 'init')
           .to('.stance-1', '0.6', {left: '30%', ease: Expo.easeInOut}, 'init')
           .to('.stance-1__text', '0.6', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__tit', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__char', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__bg-img', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__bg-player', '0.6', {opacity: 1, x: -100, ease: Expo.easeInOut}, 'init')
           .to('.stance-2', '0.6', {left: '30%', ease: Quint.easeInOut}, 'init')
           .to('.stance-2__tit', '0.6', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__text', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__char', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .to('.stance-2__bg-player', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .to('.stance-tit', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init');

//전투방식 - 신념 in
detailScene.stance2.addLabel('init')
           .add(() =>{
               playMov('stance2', playerList);
               $('.stance-1').css({'z-index': 2});
               $('.stance-2').css({'z-index': 1});
               $(window).resize();
           })
           .to('.stance-ctrl__1', '0.6', {right: '80%', ease: Expo.easeInOut}, 'init')
           .to('.stance-ctrl__2', '0.6', {left: '20%', ease: Expo.easeInOut}, 'init')
           .to('.stance-2', '0.6', {left: '-30%', ease: Expo.easeInOut}, 'init')
           .to('.stance-2__text', '0.6', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__tit', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__char', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__bg-img', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__bg-player', '0.6', {opacity: 1, x: 200, ease: Expo.easeInOut}, 'init')
           .to('.stance-1', '0.6', {left: '-30%', ease: Quint.easeInOut}, 'init')
           .to('.stance-1__tit', '0.6', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__text', '0.6', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__char', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .to('.stance-1__bg-player', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init')
           .to('.stance-tit', '0.6', {opacity: 0, ease: Quint.easeInOut}, 'init');

//전투방식 - 신념 out 광기 in
detailScene.stance3.addLabel('init')
           .to('.stance-2__bg-img', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               stopMov();
               $('.stance-1').css({'z-index': 1});
               $('.stance-2').css({'z-index': 2});
               playMov('stance1', playerList);
           })
           .to('.stance-2__tit', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__text', '1', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-2__bg-player', '1', {opacity: 0, x: 200, ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-ctrl__1', '1', {right: '20%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-ctrl__2', '1', {left: '80%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-1', '1', {left: '30%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-2', '1', {left: '30%', ease: Quint.easeInOut}, 'init+=0.2')
           .to('.stance-1__tit', '1', {opacity: 0, ease: Expo.easeInOut}, 'init+=0.3')
           .to('.stance-1__text', '1', {opacity: 1, ease: Expo.easeInOut}, 'init+=0.3')
           
           .to('.stance-1__char', '1', {opacity: 0, ease: Expo.easeInOut}, 'init+=0.5')
           .to('.stance-1__bg-player', '1.5', {opacity: 1, x: -100, ease: Expo.easeInOut}, 'init+=0.6');

//전투방식 - 광기 out 신념 in
detailScene.stance4.addLabel('init')
           .to('.stance-1__bg-img', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .add(() =>{
               stopMov();
               $('.stance-1').css({'z-index': 2});
               $('.stance-2').css({'z-index': 1});
               playMov('stance2', playerList);
           })
           .to('.stance-1__tit', '1', {opacity: 1, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__text', '1', {opacity: 0, ease: Expo.easeInOut}, 'init')
           .to('.stance-1__bg-player', '1', {opacity: 0, x: 200, ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-ctrl__1', '1', {right: '80%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-ctrl__2', '1', {left: '20%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-1', '1', {left: '-30%', ease: Quint.easeInOut}, 'init+=0.2')
           .to('.stance-2', '1', {left: '-30%', ease: Expo.easeInOut}, 'init+=0.2')
           .to('.stance-2__text', '1', {opacity: 1, ease: Expo.easeInOut}, 'init+=0.3')
           .to('.stance-2__tit', '1', {opacity: 0, ease: Expo.easeInOut}, 'init+=0.3')
           
           .to('.stance-2__char', '1', {opacity: 0, ease: Expo.easeInOut}, 'init+=0.5')
           .to('.stance-2__bg-player', '1.5', {opacity: 1, x: 200, ease: Expo.easeInOut}, 'init+=0.6');

const mainScene = {
    story: new TimelineMax({paused: true}),
    combatIntro: new TimelineMax({paused: true}),
    stanceIntro: new TimelineMax({paused: true}),
    combat1: new TimelineMax({paused: true}),
    combat2: new TimelineMax({paused: true}),
    combat3: new TimelineMax({paused: true}),
    combat4: new TimelineMax({paused: true})
};

//이야기 인트로
mainScene.story.addLabel('init')
         .add(() =>{setLayout(['-20%', '-20%'], ['120%', '-60%', .2], ['140%', '-140%', .2]);})
         .add(() =>{detailScene.story.play();})
         .to('.warrior .sub_nav', 1, {display: 'block', opacity: 1}, 'init+=0.5')
         .add(() =>{
             $('.warrior .sub_nav .warrior1').addClass('on');
         }, 'init+=0.5');

//전투방식 인트로
mainScene.combatIntro.addLabel('init')
         .add(() =>{setLayout(['-120%', '120%'], ['-20%', '-20%'], ['120%', '-120%']);})
         .add(() =>{detailScene.combatIntro.play();})
         .to('.warrior .sub_nav', 1, {display: 'block', opacity: 1}, 'init+=0.5')
         .add(() =>{
             $('.warrior .sub_nav .warrior2').addClass('on');
         }, 'init+=0.5');

//스텐스 인트로
mainScene.stanceIntro.addLabel('init')
         .add(() =>{setLayout(['-140%', '140%', .2], ['-60%', '120%', .2], ['-20%', '-20%']);})
         .add(() =>{detailScene.stanceIntro.play();})
         .to('.warrior .sub_nav', 1, {display: 'block', opacity: 1}, 'init+=0.5')
         .add(() =>{
             $('.warrior .sub_nav .warrior3').addClass('on');
         }, 'init+=0.5');

//강체
mainScene.combat1.addLabel('init')
         .add(() =>{detailScene.combat1.play()});

//투선강림
mainScene.combat2.addLabel('init')
         .add(() =>{detailScene.combat2.play()});

AREA1.hover(action1_play, action1_reverse);
AREA2.hover(action2_play, action2_reverse);
AREA3.hover(action3_play, action3_reverse);

let nowArea = '';

AREA1.on('click', () =>{
    nowArea = 'story';
    mainScene.story.play();
});

AREA2.on('click', () =>{
    nowArea = 'combatIntro';
    mainScene.combatIntro.play();
});

AREA3.on('click', () =>{
    nowArea = 'stanceIntro';
    mainScene.stanceIntro.play();
});

AREA4.on('click', () =>{
    nowArea = 'combat-1';
    
    if(combat1Open) return;
    
    if(combat2Open){
        detailScene.combat4.pause();
        detailScene.combat3.seek(0);
        detailScene.combat3.play()
    } else {
        detailScene.combat1.play();
    }
    
    combat1Open = true;
    combat2Open = false;
});

AREA5.on('click', () =>{
    nowArea = 'combat-2';
    
    if(combat2Open) return;
    
    if(combat1Open){
        detailScene.combat3.pause();
        detailScene.combat4.seek(0);
        detailScene.combat4.play();
    } else {
        detailScene.combat2.play();
    }
    
    combat2Open = true;
    combat1Open = false;
});

AREA6.on('click', () =>{
    nowArea = 'stance-1';
    
    if(stance1Open) return;
    
    if(stance2Open){
        detailScene.stance3.seek(0);
        detailScene.stance3.play();
    } else {
        detailScene.stance1.play();
    }
    
    stance1Open = true;
    stance2Open = false;
});

AREA7.on('click', () =>{
    nowArea = 'stance-2';
    
    if(stance2Open) return;
    
    if(stance1Open){
        detailScene.stance4.seek(0);
        detailScene.stance4.play();
    } else {
        detailScene.stance2.play();
    }
    
    stance2Open = true;
    stance1Open = false;
});

let isChanging = false;
$(document).on('click', '.warrior .sub_nav .warrior1', () =>{
    if(nowArea === 'story') return;
    if(isChanging) return;
    isChanging = true;
    
    if(nowArea === 'combatIntro'){
        TweenMax.to('.warrior__detail--2', 1, {opacity: 0, ease: Expo.easeInOut});
        
        detailScene.story.play();
        
        setTimeout(() =>{
            detailScene.combatIntro.seek(0);
            detailScene.combatIntro.pause();
        }, 500);
    }
    
    if(nowArea === 'combat-1' || nowArea === 'combat-2'){
        TweenMax.to('.warrior__detail--2', 0.6, {opacity: 0, ease: Expo.easeInOut});
        
        detailScene.story.play();
        
        combat1Open = false;
        combat2Open = false;
        
        setTimeout(() =>{
            detailScene.combatIntro.seek(0);
            detailScene.combatIntro.pause();
            
            detailScene.combat1.seek(0);
            detailScene.combat1.pause();
            
            detailScene.combat2.seek(0);
            detailScene.combat2.pause();
            
            $('.combat-1').removeAttr('style');
            $('.combat-2').removeAttr('style');
            
            $('.warrior__detail--2 *').removeAttr('style');
            
            $('.combat-1--out').removeClass('combat-1--out');
            $('.combat-2--out').removeClass('combat-2--out');
        }, 500);
    }
    
    if(nowArea === 'stanceIntro'){
        TweenMax.to('.warrior__detail--3', 1, {opacity: 0, left: '100%', ease: Expo.easeInOut});
        
        detailScene.story.play();
        
        stance1Open = false;
        stance2Open = false;
        
        setTimeout(() =>{
            detailScene.stanceIntro.seek(0);
            detailScene.stanceIntro.pause();
            
            detailScene.stance1.seek(0);
            detailScene.stance1.pause();
            
            detailScene.stance2.seek(0);
            detailScene.stance2.pause();
            
            $('.stance-1').removeAttr('style');
            $('.stance-2').removeAttr('style');
            
            $('.warrior__detail--3 *').removeAttr('style');
            
        }, 500);
    }
    
    if(nowArea === 'stance-1' || nowArea === 'stance-2'){
        TweenMax.to('.warrior__detail--3', 1, {opacity: 0, left: '100%', ease: Expo.easeInOut});
        
        detailScene.story.play();
        
        stance1Open = false;
        stance2Open = false;
        
        setTimeout(() =>{
            detailScene.stanceIntro.seek(0);
            detailScene.stanceIntro.pause();
            
            detailScene.stance1.seek(0);
            detailScene.stance1.pause();
            
            detailScene.stance2.seek(0);
            detailScene.stance2.pause();
            
            $('.stance-1').removeAttr('style');
            $('.stance-2').removeAttr('style');
            
            $('.warrior__detail--3 *').removeAttr('style');
            $('.combat-2--out').removeClass('combat-2--out');
            
        }, 500);
    }
    
    $('.warrior .sub_nav li').removeClass('on');
    $('.warrior .sub_nav .warrior1').addClass('on');
    
    nowArea = 'story';
    
    setTimeout(() =>{
        isChanging = false;
    }, 1500);
});

$(document).on('click', '.warrior .sub_nav .warrior2', () =>{
    if(nowArea === 'combatIntro') return;
    if(nowArea === 'combat-1') return;
    if(nowArea === 'combat-2') return;
    if(isChanging) return;
    isChanging = true;
    
    if(nowArea === 'story'){
        TweenMax.to('.warrior__detail--2', 1, {opacity: 1, ease: Expo.easeInOut});
        TweenMax.to('.warrior__detail--1', 1, {opacity: 0, left: '-100%', ease: Expo.easeInOut});
        TweenMax.to('.warrior__detail--1 .story-text__1', '0.8', {opacity: 0, x: -300, ease: Expo.easeInOut, delay: '.7'});
        TweenMax.to('.warrior__detail--1 .story-deco', '0.8', {opacity: 0, x: -500, ease: Expo.easeInOut, delay: '.75'});
        TweenMax.to('.warrior__detail--1 .story-char', '0.8', {opacity: 0, x: -500, ease: Expo.easeInOut, delay: '.75'});
        TweenMax.to('.warrior__detail--1 .story-text__2', '1', {width: '640', ease: Quint.easeInOut, delay: '1.6'});
        TweenMax.to('.warrior__detail--1 .story-button', '1', {opacity: 0, ease: Quint.easeOut, delay: '2'});
        
        setTimeout(() =>{
            detailScene.story.seek(0);
            detailScene.story.pause();
            
        }, 500);
        
        detailScene.combatIntro.play();
    }
    
    if(nowArea === 'stanceIntro'){
        TweenMax.to('.warrior__detail--3', 1, {opacity: 0, left: '100%', ease: Expo.easeInOut});
        detailScene.combatIntro.play();
        stance1Open = false;
        stance2Open = false;
        setTimeout(() =>{
            detailScene.stanceIntro.seek(0);
            detailScene.stanceIntro.pause();
            
            detailScene.stance1.seek(0);
            detailScene.stance1.pause();
            
            detailScene.stance2.seek(0);
            detailScene.stance2.pause();
            
            $('.stance-1').removeAttr('style');
            $('.stance-2').removeAttr('style');
            
            $('.warrior__detail--3 *').removeAttr('style');
            
        }, 500);
    }
    
    if(nowArea === 'stance-1' || nowArea === 'stance-2'){
        TweenMax.to('.warrior__detail--3', 1, {opacity: 0, left: '100%', ease: Expo.easeInOut});
        
        detailScene.combatIntro.play();
        
        stance1Open = false;
        stance2Open = false;
        
        setTimeout(() =>{
            detailScene.stanceIntro.seek(0);
            detailScene.stanceIntro.pause();
            
            detailScene.stance1.seek(0);
            detailScene.stance1.pause();
            
            detailScene.stance2.seek(0);
            detailScene.stance2.pause();
            
            $('.stance-1').removeAttr('style');
            $('.stance-2').removeAttr('style');
            
            $('.warrior__detail--3 *').removeAttr('style');
            $('.combat-2--out').removeClass('combat-2--out');
            
        }, 500);
    }
    
    $('.warrior .sub_nav li').removeClass('on');
    $('.warrior .sub_nav .warrior2').addClass('on');
    
    nowArea = 'combatIntro';
    
    setTimeout(() =>{
        isChanging = false;
    }, 1500);
});

$(document).on('click', '.warrior .sub_nav .warrior3', () =>{
    if(nowArea === 'stanceIntro') return;
    if(nowArea === 'stance-1') return;
    if(nowArea === 'stance-2') return;
    
    if(isChanging) return;
    isChanging = true;
    
    if(nowArea === 'story'){
        TweenMax.to('.warrior__detail--2', 1, {opacity: 1, ease: Expo.easeInOut});
        TweenMax.to('.warrior__detail--1', 1, {opacity: 0, left: '-100%', ease: Expo.easeInOut});
        TweenMax.to('.warrior__detail--1 .story-text__1', '0.8', {opacity: 0, x: -300, ease: Expo.easeInOut, delay: '.7'});
        TweenMax.to('.warrior__detail--1 .story-deco', '0.8', {opacity: 0, x: -500, ease: Expo.easeInOut, delay: '.75'});
        TweenMax.to('.warrior__detail--1 .story-char', '0.8', {opacity: 0, x: -500, ease: Expo.easeInOut, delay: '.75'});
        TweenMax.to('.warrior__detail--1 .story-text__2', '1', {width: '640', ease: Quint.easeInOut, delay: '1.6'});
        TweenMax.to('.warrior__detail--1 .story-button', '1', {opacity: 0, ease: Quint.easeOut, delay: '2'});
        
        setTimeout(() =>{
            detailScene.story.seek(0);
            detailScene.story.pause();
            
        }, 500);
        
        detailScene.stanceIntro.play();
    }
    
    if(nowArea === 'combatIntro'){
        TweenMax.to('.warrior__detail--2', 1, {opacity: 0, ease: Expo.easeInOut});
        detailScene.stanceIntro.play();
        
        setTimeout(() =>{
            detailScene.combatIntro.seek(0);
            detailScene.combatIntro.pause();
            
        }, 500);
    }
    
    if(nowArea === 'combat-1' || nowArea === 'combat-2'){
        TweenMax.to('.warrior__detail--2', 0.6, {opacity: 0, ease: Expo.easeInOut});
        
        detailScene.stanceIntro.play();
        
        combat1Open = false;
        combat2Open = false;
        
        setTimeout(() =>{
            detailScene.combatIntro.seek(0);
            detailScene.combatIntro.pause();
            
            detailScene.combat1.seek(0);
            detailScene.combat1.pause();
            
            detailScene.combat2.seek(0);
            detailScene.combat2.pause();
            
            $('.combat-1').removeAttr('style');
            $('.combat-2').removeAttr('style');
            
            $('.warrior__detail--2 *').removeAttr('style');
            
            $('.combat-1--out').removeClass('combat-1--out');
            $('.combat-2--out').removeClass('combat-2--out');
            
        }, 500);
    }
    
    $('.warrior .sub_nav li').removeClass('on');
    $('.warrior .sub_nav .warrior3').addClass('on');
    
    nowArea = 'stanceIntro';
    
    setTimeout(() =>{
        isChanging = false;
    }, 1500);
});

$('.warrior').on('mouseleave', resetIndex);

const onStart = () =>{
    onIndex();
    resetAnimation();
    hoverActive = false;
    introTimeline.seek(0);
    introTimeline.pause();
};

const onComplete = () =>{

};

const onAnimation = () =>{
    introTimeline.play();
    
    setTimeout(() =>{
        hoverActive = true;
    }, 500);
};

export default {
    onStart,
    onComplete,
    onAnimation
};

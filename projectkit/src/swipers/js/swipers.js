import Setcookie from '../../cookie/setcookie';
import Getcookie from '../../cookie/getcookie';
import Remote from '../../remote/js/remote';


const swipers = (function(){
    let set, addEvent, lastPage;
    let mySwiper,maxLength, remote;

    set = function(direction){
        if( !direction ) direction = 'horizontal';
        mySwiper = new Swiper('#main-swiper', {
            direction: direction, // horizontal & vertical
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows : false,},
            hashNavigation: {watchState: true},
            pagination: {el: '#contents > .swiper-pagination', type: 'fraction',},
        });
        maxLength = mySwiper.slides.length -1;

        if( !Getcookie('SliderGuideCookie') ){
            let tag;
            direction == 'vertical' ? tag = '<div class="guide type"></div>' : tag = '<div class="guide"></div>';
            $('#main-swiper .swiper-slide-active').append( tag );
            Setcookie('SliderGuideCookie', true);
        }
    };
    lastPage = function(){
        // last Page 일때 footer영역 보여주기
        mySwiper.activeIndex == maxLength ? $('#footer').show() : $('#footer').hide();
    };
    addEvent = function(){
        mySwiper.once('slideChange', function () {
            if( $('.guide').length ) $('.guide').remove();
        });
        mySwiper.on('slideChange', function (e) {
            remote.navAnchor( mySwiper.activeIndex ); //리모트메뉴 active변경
            lastPage();
        });
        setTimeout(function(){
            // 가이드가 있을 경우 2초 뒤에 삭제
            if( $('#main-swiper .guide').length ) $('#main-swiper .guide').fadeOut(1000, function(){
                $(this).remove();
            });
        }, 2000);
    };
    return{
        init: function(direction){

            $('html').addClass('swipers');
            remote = new Remote({
                element:"#remoteMenu",  // element
                type:'custom',
                top:0,    // 기본 상단에서 떨어진 값
                fix:0,    // 스크롤시 상단에서 떨어진 값
                show:false,    // true : 보이기 / false : 숨기기
                quick:false      // true : 퀵메뉴 / flase : 네비게이션
            });
            set(direction);
            lastPage();
            addEvent();
            remote.navAnchor( mySwiper.activeIndex );
        },

        on: function(event, callback){
            mySwiper.on(event, callback);
        },
    }
})();

export default swipers;
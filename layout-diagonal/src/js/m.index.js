$(document).ready(function(){
    $('html').addClass('swipers');
    BtypeSlider.init();
    BtypeMain.init();
});

var BtypeSlider = (function(){
    var addEvent, sideSet;
    var mySwiper = new Swiper('#main-swiper', {
        direction: 'horizontal', // horizontal & vertical
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : false,
        },
        hashNavigation: {
            watchState: true
        },
        pagination: {
            el: '#contents > .swiper-pagination',
            type: 'fraction',
        },
        on: {
            init: function(){
                if( !nc.promokit.cookie.getcookie('SliderGuideCookie') ){
                    $('#main-swiper .swiper-slide-active').append('<div class="guide"></div>');
                    nc.promokit.cookie.setcookie('SliderGuideCookie', true);
                }
            }
        },
    });
    var maxLength = mySwiper.slides.length -1;

    sideSet = function(){
        // last Page 일때 footer영역 보여주기
        mySwiper.activeIndex == maxLength ? $('#footer').show() : $('#footer').hide();
    };
    addEvent = function(){
        mySwiper.once('slideChange', function () {
            if( $('.guide').length ) $('.guide').remove();
        });
        mySwiper.on('slideChange', function (e) {
            remote.navAnchor( mySwiper.activeIndex ); //리모트메뉴 active변경
            sideSet();
        });
        setTimeout(function(){
            // 가이드가 있을 경우 2초 뒤에 삭제
            if( $('.guide').length ) $('.guide').fadeOut(1000, function(){
                $(this).remove();
            });
        }, 2000);
    };
    return{
        swiper: mySwiper,
        init: function(){
            remote = new nc.promokit.remote({
                element:"#remoteMenu",  // element
                type:'custom',
                top:0,    // 기본 상단에서 떨어진 값
                fix:0,    // 스크롤시 상단에서 떨어진 값
                show:false,    // true : 보이기 / false : 숨기기
                quick:false      // true : 퀵메뉴 / flase : 네비게이션
            });

            sideSet();
            addEvent();
            remote.navAnchor( mySwiper.activeIndex );
        }
    }
})();

var BtypeMain = (function(){
    var Slider;

    Slider = (function(){
        var swiperSet;
        var subSwiper1, subSwiper2;

        swiperSet = function(){
            subSwiper1 = new Swiper('.sub-swiper-1',{
                loop:true,
                spaceBetween: 50,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
            subSwiper2 = new Swiper('.sub-swiper-2',{
                loop:true,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        };
        return {
            init: function(){
                swiperSet();
            }
        }
    })();

    return {
        init: function(){
            Slider.init();
        }
    }
})();
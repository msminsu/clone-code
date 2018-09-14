import isMobile from '../../util/isMobile';
import getCookie from '../../cookie/getcookie';
import setCookie from '../../cookie/setcookie';


const plugin = function(){

    if (isMobile()) {
        $('body').addClass('ui-mobile');
    }else{
        $('body').addClass('ui-desktop');
    }

        function TopBtn(target){


            target.append('<a href="#header"  title="상단으로 이동" data-goTop="goTop">Top</a>');

            this.$topBtn =$('[data-goTop *= "goTop"]');
            this.$caution = $('.toggle-caution');
            this.$window = $(window);
            this.currentPos = this.$window.scrollTop();
            this.startPoint = $('#header').height();

            this.init();
        };
        TopBtn.prototype.init = function(){
            this.positionChk();
            this.scrollEvt();
            this.goTopEvt();
        };
        TopBtn.prototype.positionChk = function(){
            if(this.currentPos >= this.startPoint) {
                this.$topBtn.css({top:'auto'}).show().addClass('fix');
            }else{
                this.$topBtn.hide();
            }
        };
        TopBtn.prototype.scrollEvt = function(){
            var that = this;
            this.$window.on('scroll',function(){
                var nowPos = $(this).scrollTop();

                if(nowPos >= that.startPoint){
                    that.$topBtn.fadeIn();
                }else{
                    that.$topBtn.fadeOut();
                }

                that.$topBtn.css({top:'auto'}).removeClass('stay').addClass('fix');
            });
        };
        TopBtn.prototype.goTopEvt = function(){
            this.$topBtn.on('click', function(e){
                e.preventDefault();
                $('html, body').stop()
                    .animate({
                        scrollTop : 0
                    },800);
            });
        };

        function Folding(target, isVisible){
            this.$caution = target;
            this.$panel = this.$caution.find('.disc-wrap');
            this.$foldingBtn = $('.btn-arrow');
            this.$isNext = target.next().is('#footer');
            this.$viewHeight = 0;

            this.init(isVisible);
        }
        Folding.prototype.init = function( isVisible ){

            this.$viewHeight = (this.$panel.outerHeight()+ $('#footer').outerHeight()) - $(window).height();

            if(isVisible){
                this.$caution.addClass('show');
                this.$panel.show();
            }

            this.toggleEvt();
        };
        Folding.prototype.toggleEvt = function(){

            var that = this;

            this.$foldingBtn.on('click', function(){

                if(that.$caution.hasClass('show')) {
                    that.$caution.removeClass('show');
                    that.$panel.slideUp();
                }else{
                    that.$caution.addClass('show');
                    that.$panel.slideDown();

                    if(that.$isNext && that.$viewHeight < 0) {
                        $('html, body').stop()
                            .animate({
                                scrollTop: $(document).height() + $(window).height()
                            }, 1000);
                    }
                }
            });
        };

        function FullHeader(target){
            var $window = $(window);
            var h = $window.height();

            target.css({
                'background-size': 'cover'
            });

            target.height(h);

            $(window).resize(function(){
                target.height($window.height());
            });
        };

        function FixHeader(target){
            this.$window = $(window);
            this.$coverHeight = null;
            this.$value = null;
            this.$header = target;

            target.css({
                'position':'fixed',
                'background-size': 'cover',
                'width': '100%',
                'top':0
            });


            var that =this;

            this.init();

            this.$window.resize(function(){
                that.screenChk();
            });

            this.$window.scroll(function(e){
                var scrollY = e.currentTarget.scrollY;

                that.$value = (that.$coverHeight - (scrollY)) / that.$coverHeight;

                if (that.$value >= 0) {
                    that.$header.css('opacity',that.$value);
                }

                if(scrollY >= that.$coverHeight){
                    that.$value = 0;
                    that.$header.css('opacity',0);
                }
            });

        };

        FixHeader.prototype.init = function(){
            this.screenChk();
        };

        FixHeader.prototype.screenChk = function(){
            this.$coverHeight = this.$window.height();
            this.$value = (this.$coverHeight - (this.$window.scrollTop())) / this.$coverHeight;

            this.$header.height(this.$coverHeight).css('opacity',this.$value);

            $('[data-fix = "fix"]').css({'margin-top':this.$coverHeight});
        };

        function CoachMarks(settings){

            if(!getCookie('CoachMarkInfo')) {

                if(settings.direction === 'vertical'){
                    $('body').append('<div class="guide">상하로 이동하세요.</div>');
                }
                else{
                    $('body').append('<div class="guide horizental">좌우로 이동하세요.</div>');
                }

                var $guide = $('.guide');

                setTimeout(function(){
                    if( $guide.length ) $guide.fadeOut(function(){
                        $(this).remove()
                    });
                }, 2000);

                $(window).on('touchstart',function(){
                    $guide.fadeOut(function(){
                        $(this).remove()
                    });
                });

                if(settings.cookie) {
                    setCookie('CoachMarkInfo', true);
                }
            }

        };

        $.fn.TopBtn = function(){
            new TopBtn($(this));
            return this;
        };

        $.fn.Folding = function(options){
            var settings = $.extend({open:false},options);
            new Folding($(this), settings.open);
            return this;
        };

        $.fn.FullHeader = function(){
            if (isMobile()) {
                new FullHeader($(this));
                return this;
            }
        };

        $.fn.FixHeader = function(){
            if (isMobile()){
                new FixHeader($(this));
                return this;
            }

        };

        $.fn.CoachMark = function(options){
            var settings = $.extend({direction:'vertical',cookie:false},options);
            if (isMobile()) {
                new CoachMarks(settings);
                return this;
            }
        };

};

export default plugin;
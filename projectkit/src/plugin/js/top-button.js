function TopBtn(target, gap) {
    target.append('<a href="#header"  title="상단으로 이동" data-goTop="goTop">Top</a>');

    this.$topBtn = $('[data-goTop *= "goTop"]');
    this.$caution = $('.section-caution');
    this.$window = $(window);
    this.bottomGap = this.$caution.position().top + (gap * (-1));
    this.currentPos = this.$window.scrollTop();
    this.startPoint = $('#header').height();
    this.stopPoint = ($(document).height() - this.$window.height()) - (this.$caution.height() + $('#footer').height() + gap);

    this.init();
}

TopBtn.prototype.init = function () {
    this.positionChk();
    this.scrollEvt();
    this.goTopEvt();
};
TopBtn.prototype.positionChk = function () {
    if (this.currentPos >= this.startPoint) {
        if (this.currentPos >= this.stopPoint) {
            this.$topBtn.css({top: this.bottomGap}).show().addClass('stay');
        } else {
            this.$topBtn.css({top: 'auto'}).show().addClass('fix');
        }
    } else {
        this.$topBtn.hide();
    }
};
TopBtn.prototype.scrollEvt = function () {
    var that = this;
    this.$window.on('scroll', function () {
        var nowPos = $(this).scrollTop();

        if (nowPos >= that.startPoint) {
            that.$topBtn.fadeIn();
        } else {
            that.$topBtn.fadeOut();
        }

        if (!(that.stopPoint >= nowPos)) {
            that.$topBtn.css({top: that.bottomGap}).removeClass('fix').addClass('stay')
        } else {
            that.$topBtn.css({top: 'auto'}).removeClass('stay').addClass('fix');
        }
    });
};
TopBtn.prototype.goTopEvt = function () {
    this.$topBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').stop()
            .animate({
                scrollTop: 0
            }, 800);
    });
};


export default TopBtn;
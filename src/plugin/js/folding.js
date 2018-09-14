function Folding(target, isVisible){
    this.$caution = target;
    this.$panel = this.$caution.find('.disc-wrap');
    this.$foldingBtn = $('.btn-arrow');

    this.init(isVisible);
}
Folding.prototype.init = function( isVisible ){

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

            $('html, body').stop()
                .animate({
                    scrollTop :$(document).height() +$(window).height()
                },1000);
        }
    });
};

export default Folding;
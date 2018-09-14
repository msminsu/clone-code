function FixHeader(target){
    this.$window = $(window);
    this.$coverHeight = null;
    this.$value = null;
    this.$header = target;


    target.css({
        'position':'fixed',
        'background-size': 'cover',
        'width': '100%',
        'max-width': '640px'
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
}


FixHeader.prototype.init = function(){
    this.screenChk();
};

FixHeader.prototype.screenChk = function(){
    this.$coverHeight = this.$window.height();
    this.$value = (this.$coverHeight - (this.$window.scrollTop())) / this.$coverHeight;

    this.$header.height(this.$coverHeight).css('opacity',this.$value);

    $('[data-fix = "fix"]').css({'margin-top':this.$coverHeight});
};


export default FixHeader;
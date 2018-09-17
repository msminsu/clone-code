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
}

export default FullHeader;
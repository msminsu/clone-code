import gamename from '../../util/gameName';
import ismobile from '../../util/isMobile';
import environment from '../../util/environment';
import animationframe from '../../util/animationFrame';

import ImageLoader from './image-loader';
import VideoLoader from './video-loader';
import YoutubeLoader from './youtube-loader';

class Preloader {
    constructor(options){
        this.config = $.extend({
            'image': [],
            'video': [],
            'youtube': [],
            'theme': [],
            'comment': '본 페이지는 Chrome/IE10 이상의 1920 x 1080 해상도에 최적화되어 있습니다.',
            'removeType': 'fadeOut',
            'resourcePath': '',
            'delay': 0,
            'game': ''
        }, options);

        this.store = {
            loaded: 0,
            loadFail: 0,
            loadSuccess: 0,
            loadSize: 0,
            progress: 0,

            href: '',
            static: '',
            game: '',
            width: 0,
            height: 0,
            isMobile: false,
            animationFrame: false,
            theme: null
        };

        this._init();
    }

    _init(){
        this.store.href = location.href;
        this.store.loadSize = this.config.image.length + this.config.video.length + this.config.youtube.length;

        if(this.config.resourcePath.length > 0) {
            this.store.static = this.config.resourcePath;
        } else {
            switch(environment()) {
                case 'live':
                    this.store.static = 'https://wstatic-cdn.plaync.com';
                    break;

                case 'rc':
                    this.store.static = 'https://rc-wstatic.plaync.co.kr';
                    break;

                case 'local':
                    this.store.static = 'http://ui-static.korea.ncsoft.corp';
                    break;
            }
        }

        this.store.game = this.config.game || gamename().en;
        this.store.isMobile = ismobile();

        this._setTheme();

        this._loadFile();

        this._updateBar();
    }

    _setTheme(){
        this.store.theme = {
            "aion": [`${this.store.static}/promokit/v1.1/img/loader_aion_off.png`, `${this.store.static}/promokit/v1.1/img/loader_aion_on.png`, "#020811"],
            "lineage": [`${this.store.static}/promokit/v1.1/img/loader_lineage_off.png`, `${this.store.static}/promokit/v1.1/img/loader_lineage_on.png`, "#020811"],
            "lineage2": [`${this.store.static}/promokit/v1.1/img/loader_lineage2_off.png`, `${this.store.static}/promokit/v1.1/img/loader_lineage2_on.png`, "#020811"],
            "lineage2classic": [`${this.store.static}/promokit/v1.1/img/loader_lineage2classic_off.png`, `${this.store.static}/promokit/v1.1/img/loader_lineage2classic_on.png`, "#020811"],
            "bns": [`${this.store.static}/promokit/v1.1/img/loader_bns_off.png`, `${this.store.static}/promokit/v1.1/img/loader_bns_on.png`, "#020811"],
        };

        this.store.theme = [
            this.config.theme[0] ? `${this.store.static}${this.config.theme[0]}` : this.store.theme[this.store.game][0],
            this.config.theme[1] ? `${this.store.static}${this.config.theme[1]}` : this.store.theme[this.store.game][1],
            this.config.theme[2] || this.store.theme[this.store.game][2]
        ];

        let img = new Image();

        img.onload = (e) =>{
            $('body').append(this._themeTemplate(this.store.isMobile ? e.target.width / 2 : e.target.width, this.store.isMobile ? e.target.height / 2 : e.target.height));
        };

        img.src = this.store.theme[0];
    }

    _themeTemplate(w, h){
        let loaderStyle = {
            loader: `background:${this.store.theme[2]}; position:fixed; top:0; bottom:0; left:0; right:0; z-index:10000;`,
            con: `position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center;`,
            bar: `background:url(${this.store.theme[0]}) 50% 100% no-repeat; width:${w}px; height:${h}px; background-size:cover; position:relative; display:inline-block;`,
            progress: `background:url(${this.store.theme[1]}) 50% 100% no-repeat;background-size:cover; position:absolute; left:0; bottom:0; width:100%; height:0;transition-property:height;transition-duration:.5s`
        };

        this.config.comment = this.config.comment && !this.store.isMobile ? `<div class="loader__comment" style="margin-top:30px;color:#8d8f91;font-size:12px;white-space:nowrap;">${this.config.comment}</div>` : '';

        return (
            `<div class="loader" style="${loaderStyle.loader}">
                <div class="loader__con" style="${loaderStyle.con}">
                    <div class="loader__bar" style="${loaderStyle.bar}">
                        <div class="loader__progress" style="${loaderStyle.progress}"></div>
                    </div>
                    ${this.config.comment}
                </div>
            </div>`
        );
    }

    _loadFile(){
        if(this.config.image.length > 0) {
            for(let item of this.config.image) {
                new ImageLoader(`${this.store.static}${item}`, this);
            }
        }

        if(this.config.video.length > 0) {
            for(let item of this.config.video) {
                new VideoLoader(item, this);
            }
        }

        if(this.config.youtube.length > 0) {
            for(let item of this.config.youtube) {
                new YoutubeLoader(item, this);
            }
        }
    }

    _updateBar(){
        let draw = () =>{
            if(this.store.loaded < this.store.loadSize) {
                this.store.progress = this.store.loaded;
                let progressSize = (this.store.progress / this.store.loadSize * 100) >= 100 ? 100 : this.store.progress / this.store.loadSize * 100;
                $('.loader__progress').css({height: progressSize + '%'});
            }

            if(this.store.loaded === this.store.loadSize) {
                $('.loader__progress').css({height: 100 + '%'});
                animationId.stop();

                $('.loader').delay(200 + this.config.delay)[this.config.removeType](this.config.removeType === 'fadeOut' ? 300 : 0, function(){
                    $(this).remove();
                });

                $(document).trigger('preLoaded');
                $(document).trigger('preloadend');
                $(window).trigger('resize');
            }
        };

        let animationId = new animationframe(draw);

        animationId.start();
    };

    _onSuccess(type, msg){
        this.store.loadSuccess = this.store.loadSuccess + 1;
        this.store.loaded = this.store.loaded + 1;
    }

    _onFail(type, msg){
        console.log(msg);
        this.store.loadFail = this.store.loadFail + 1;
        this.store.loaded = this.store.loaded + 1;
    }
}

export default Preloader;
import AnimationFrame from '../../util/animationFrame';

import isMobile from '../../util/isMobile';
import setcookie from '../../cookie/setcookie';
import getcookie from '../../cookie/getcookie';

import MessageConfirm from '../../message/js/message-confirm';

import loadPlayer from './util/loader-player';

const message = new MessageConfirm({'data': '', 'fade': true, 'esc': true, 'dim': true});

class Player {
    constructor(_option) {
        if (!_option && typeof(_option) !== 'object') {
            throw new TypeError(
                'Player module need object type option');
        }
        if (_option && !document.querySelector(_option.selector)) {
            throw new TypeError(
                `no ${_option.selector} DOM Element`);
        }

        this.config = $.extend({
            videoId: '',
            playerId: `${_option.selector.replace(/^#/, '')}__screen`,
            mute: false,
            autoPlay: false,
            loop: false,
            controls: false,
            coverClick: false,
            poster: '',
            hideLoading: false
        }, _option);
        this.context = $(_option.selector);
        this.player = null;
        this.sourceType = '';
        this.state = {
            isPlay: false,
            startQ: false,
            isReady: false,
            seek: 0
        };

        this._init();
    }

    _init() {
        this.source = '';
        this.playerContext = false;
        this.DOM = {
            progress: null,
            progressBar: null,
            poster: false,
            controls: null,
            play: null,
            pause: null
        };
        this.state = {
            isPlay: false,
            isControlShow: true,
            progress: 0,
            progressLeft: 0,
            timer: 0,
            duration: 0
        };

        this.sourceType = this._getPlayerType(this.config.videoId.substring(this.config.videoId.lastIndexOf('.', this.config.videoId.length)).toLowerCase());

        this.animationFrame = new AnimationFrame(this._handleTimeUpdate.bind(this));

        this.context.on('play', () => {
            this.state.isPlay = true;
            this.animationFrame.start();

            if (this.config.controls) {
                this.DOM.play.removeClass('player__play_show');
                this.DOM.pause.addClass('player__pause_show');

                this.state.timer = setTimeout(() => {
                    if (!this.state.isPlay) return;
                    this.DOM.controls.addClass('player__controls_hide');
                }, 1000);

                this.state.isControlShow = false;
            }
            this.DOM.poster.fadeOut();
        });

        this.context.on('pause', () => {
            this.state.isPlay = false;
            this.animationFrame.stop();

            this.seek(this.getCurrentTime());

            if (this.config.controls) {
                this.DOM.play.addClass('player__play_show');
                this.DOM.pause.removeClass('player__pause_show');
                this.DOM.controls.removeClass('player__controls_hide');
                this.state.isControlShow = true;
            }
        });

        this.context.on('end', () => {
            this.state.isPlay = false;
            this.stop();
            this.animationFrame.stop();

            if (this.config.loop) {
                this.play();
                return;
            }

            this.DOM.poster.show();

            if (this.config.controls) {
                this.DOM.play.addClass('player__play_show');
                this.DOM.pause.removeClass('player__pause_show');
                this.DOM.controls.removeClass('player__controls_hide');
                this.state.isControlShow = true;
            }
        });

        this.context.on('canplay', () => {
            this.context.off('canplay');
            this.state.duration = this.getDuration();
    
            this.context.find('.player__loading-spinner').removeClass('player__loading-spinner--show');
            this.context.find('.player--hide').removeClass('player--hide');

            this.source = this.player.source;
            this.playerContext = $(`#${this.config.playerId}`);
            this.playerContext.css(this._getMovieSize(this.context[0].offsetWidth, this.context[0].offsetHeight, this.source.videoWidth, this.source.videoHeight));
            this.playerContext.css(this._getMovieSize(this.context[0].offsetWidth, this.context[0].offsetHeight, this.source.videoWidth, this.source.videoHeight));

            this._detectDom();
            this._controller();

            this.playerContext.addClass('isReady');

            this.state.isReady = true;
            this.config.mute && this.player.mute();
            this.config.autoPlay && this.autoplay(isMobile());
        });

        $(window).on('resize.player', () => {
            this.state.isReady && this.config.controls && this._detectDimension();
            this.playerContext && this.playerContext.css(this._getMovieSize(this.context[0].offsetWidth, this.context[0].offsetHeight, this.source.videoWidth, this.source.videoHeight));
        });

        loadPlayer(this);

        return false;
    }

    _controller() {
        if (this.config.controls) {
            this.context.on('mousemove', (e) => {
                if (!this.state.isPlay) return;

                if (e.target === this.DOM.progress[0] || e.target === this.DOM.progressBar[0] || e.target === this.DOM.play[0] || e.target === this.DOM.pause[0]) return;

                if (!this.state.isControlShow) {
                    this.state.isControlShow = true;

                    this.DOM.controls.removeClass('player__controls_hide');
                } else {
                    clearTimeout(this.state.timer);

                    this.state.timer = setTimeout(() => {
                        if (!this.state.isPlay) return;
                        this.state.isControlShow = false;

                        this.DOM.controls.addClass('player__controls_hide');
                    }, 1000);
                }
            });

            this.context.on('mouseover', '.player__progress', () => {
                if (!this.state.isPlay) return;

                clearTimeout(this.state.timer);

                this.DOM.controls.removeClass('player__controls_hide');
            });

            this.context.on('mouseout', '.player__progress', () => {
                if (!this.state.isPlay) return;

                clearTimeout(this.state.timer);

                this.state.timer = setTimeout(() => {
                    if (!this.state.isPlay) return;
                    this.state.isControlShow = false;

                    this.DOM.controls.addClass('player__controls_hide');
                }, 1000);
            });

            this.context.on('click', '.player__play', () => {
                this.play();
            });

            this.context.on('click', '.player__pause', () => {
                this.pause();
            });

            this.context.on('click', '.player__progress', (e) => {
                this.seek((1 - (this.state.progress - (e.clientX - this.state.progressLeft)) / this.state.progress) * (this.state.duration == 0 ? this.getDuration() : this.state.duration));
                this.play();
            });
        }

        if (this.config.coverClick) {
            this.context.on('click', '.player__cover', () => {
                this.state.isPlay ? this.pause() : this.play();
            });
        }
    }

    _detectDom() {
        this.DOM.poster = this.context.find('.player__poster');
        this.DOM.spinner = this.context.find('.player__loading-spinner');

        if (this.config.controls) {
            this.DOM.controls = this.context.find('.player__controls');
            this.DOM.progress = this.context.find('.player__progress');
            this.DOM.progressBar = this.context.find('.player__progress-bar');
            this.DOM.play = this.context.find('.player__play');
            this.DOM.pause = this.context.find('.player__pause');
            this._detectDimension();
        }
    }

    _detectDimension() {
        this.state.progress = this.DOM.progress.width();
        this.state.progressLeft = this.DOM.progress[0].getBoundingClientRect().left;
    }

    _handleTimeUpdate() {
        if (!this.config.controls) return;
        this.state.duration = this.getDuration();
    
        const bar = (this.getCurrentTime() /this.getDuration()).toFixed(6);
        
        this.DOM.progressBar.css({
            'transform': `scaleX(${bar > 1 ? 1 : bar})`
        });
    }

    _getPlayerType(fileType) {
        if (fileType === '.mp4') {
            return 'video';
        }
        else {
            if (fileType === '.gif') {
                return 'gif';
            }
            else {
                return 'youtube';
            }
        }
    }

    _getMovieSize(contextWidth, contextHeight, videoWidth = 1280, videoHeight = 720) {
        let setWidth = 0;
        let setHeight = 0;

        if ((contextWidth / contextHeight) < (videoWidth / videoHeight)) {
            setWidth = contextHeight * videoWidth / videoHeight;
            setHeight = contextHeight;
        } else {
            setWidth = contextWidth;
            setHeight = contextWidth * videoHeight / videoWidth;
        }

        return {
            width: setWidth,
            height: setHeight
        };
    }

    play() {
        if (this.state.isPlay) return;

        if (isMobile()) {
            if (getcookie('promoPlayer')) {
                this.player.play();

            } else {
                message.openConfirm('WI-FI 모드가 아닌 경우,<br> 데이터 요금이 발생될 수 있습니다.', () => {
                    this.player.play();
                    setcookie('promoPlayer', true, 1);
                });
            }
        } else {
            this.player.play();
        }
    }

    autoplay(isMobile) {
        if (isMobile) return;
        this.play();
    }

    stop() {
        this.player.stop();
    }

    pause() {
        this.player.pause();
    }

    mute() {
        this.player.mute();
    }

    unMute() {
        this.player.unMute();
    }

    seek(t) {
        this.player.seek(t);
    }

    getDuration() {
        return this.player.getDuration();
    }

    getCurrentTime() {
        return this.player.getCurrent();
    }

    on(e, eventListener) {
        this.context.on(e, eventListener);
    }

    off(e) {
        this.context.off(e);
    }

    get isPlay() {
        return this.state.isPlay;
    }
}

export default Player;

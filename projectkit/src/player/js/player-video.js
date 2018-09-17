class VideoPlayer {
    constructor(props, template) {
        this.context = props.context;
        this.context.append(template);

        props.config.hideLoading || props.context.find('.player__loading-spinner').addClass('player__loading-spinner--show');

        this.source = this.context.find(`#${props.config.playerId}`)[0];

        $(this.source).on('canplaythrough', () => this._handleReady());

        this.source.load();
    }

    _setEvent() {
        $(this.source).on('ended', () => {
            this.context.trigger('end');
        });

        $(this.source).on('play', () => {
            this.context.trigger('play');
        });

        $(this.source).on('timeupdate', () => {
            this.context.trigger('timeupdate');
        });

        $(this.source).on('pause', () => {
            this.context.trigger('pause');
        });

        $(this.source).on('durationchange', () => {
            this.context.trigger('durationchange');
        });
    }

    _handleReady() {
        $(this.source).off('canplaythrough');
        this.context.trigger('canplay');
        this._setEvent();
    }

    play() {
        this.source.play();
    }

    stop() {
        this.source.pause();
        this.source.currentTime = 0;
        this.context.trigger('stop');
    }

    pause() {
        this.source.pause();
    }

    mute() {
        this.source.muted = true;
    }

    unMute() {
        this.source.muted = false;
    }

    seek(t) {
        this.source.currentTime = t;
    }

    getDuration() {
        return this.source.duration;
    }

    getCurrent() {
        return this.source.currentTime;
    }
}

export default VideoPlayer;
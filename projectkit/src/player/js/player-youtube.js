class YoutubePlayer {
    constructor(props, template) {
        this.context = props.context;
        this.context.append(template);

        this.context.find('.player__context').attr('id', props.config.playerId);
        props.config.hideLoading || props.context.find('.player__loading-spinner').addClass('player__loading-spinner--show');

        this.source = new window.YT.Player(props.config.playerId, {
            width: '100%',
            height: '100%',
            videoId: props.config.videoId,
            playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                controls: 0,
                playsinline: 1,
                autoplay: props.config.autoPlay === true ? 1 : 0,
                loop: props.config.loop === true ? 1 : 0,
                playlist: props.config.loop === true ? props.config.videoId : '',
            },
        });

        this.oldEvent = -1;
        this.source.addEventListener('onReady', () => this._handleReady());
    }

    _setEvent() {
        const Event = {
            0: 'end',
            1: 'play',
            2: 'pause'
        };

        this.source.addEventListener('onStateChange', e => {
            if (e.data === 3 || e.data === this.oldEvent) {
                return;
            }

            this.oldEvent = e.data;

            let eventName = Event[`${e.data}`];
            eventName && this.context.trigger(eventName);
        });
    }

    _handleReady() {
        this.context.trigger('canplay');
        this._setEvent();
    }

    play() {
        this.source.playVideo();
    }

    stop() {
        this.source.stopVideo();
    }

    pause() {
        this.source.pauseVideo();
    }

    mute() {
        this.source.mute();
    }

    unMute() {
        this.source.unMute();
    }

    seek(t) {
        this.source.seekTo(t);
    }

    getDuration() {
        return this.source.getDuration();
    }

    getCurrent() {
        return this.source.getCurrentTime();
    }
}

export default YoutubePlayer;
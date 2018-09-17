import {GifReader} from './util/gif-reader';
import AnimationFrame from '../../util/animationFrame';

class GifPlayer {
    constructor(props, template) {
        this.context = props.context;
        this.context.append(template);

        props.config.hideLoading || props.context.find('.player__loading-spinner').addClass('player__loading-spinner--show');

        this.screen = this.context.find(`#${props.config.playerId}`);

        this.context.find('.player__context').append(this.screen);
        this.cxt = this.screen[0].getContext('2d');
        this.source = {
            videoWidth: 0,
            videoHeight: 0,
        };
        this.state = {
            fps: props.config.gifFps || 20,
            frames: [],
            animationFrame: {},
            isPlay: false,
            nowFrame: 0,
            totalFrame: 0,
        };
        this.loadGIF(props.config.videoId);
    }

    loadGIF(src) {
        let oReq = new XMLHttpRequest();
        oReq.open('GET', src, true);
        oReq.responseType = 'arraybuffer';
        oReq.onload = () => {
            let arrayBuffer = oReq.response;
            if (arrayBuffer) {
                this._handleReady(new GifReader(new Uint8Array(arrayBuffer)));
            }
        };
        oReq.send(null);
    }

    _decode(source, i) {
        let info = source.frameInfo(i);

        let imageData = this.cxt.createImageData(info.width, info.height);

        source.decodeAndBlitFrameRGBA(i, imageData.data);

        return imageData;
    }

    _handleReady(source) {
        this.gif = source;
        let sourceInfo = source.frameInfo(0);
        this.state.totalFrame = source.numFrames();
        this.source.videoWidth = sourceInfo.width;
        this.source.videoHeight = sourceInfo.height;

        $(this.screen).attr({
            'width': sourceInfo.width,
            'height': sourceInfo.height,
        });

        this.state.frames[0] = this._decode(source, 0);
        this.cxt.putImageData(this.state.frames[0], 0, 0);

        this.context.trigger('canplay');
    }

    _render(q) {
        this.state.frames[q] = this.state.frames[q] || this._decode(this.gif, q);
        this.cxt.clearRect(0, 0, this.source.videoWidth, this.source.videoHeight);
        this.cxt.putImageData(this.state.frames[q], 0, 0);
        this.state.nowFrame = q + 1;
    }

    play(to) {
        if (this.state.isPlay) return;
        this.state.isPlay = true;
        to > -1 && this.seek(to);

        if (this.state.nowFrame >= this.state.totalFrame) {
            this.state.nowFrame = 0;
        }

        this.context.trigger(`play`);

        this.state.animationFrame = new AnimationFrame(() => {
            if (this.state.nowFrame >= this.state.totalFrame) {
                this.state.isPlay = false;
                this.state.animationFrame.stop();
                this.context.trigger(`end`);
                return;
            }
            this._render(this.state.nowFrame);
        }, this.state.fps);
        this.state.animationFrame.start();
    }

    stop() {
        this.context.trigger(`stop`);
        this.state.isPlay = false;
        this.state.animationFrame && this.state.animationFrame.stop();
        this._render(0);
    }

    pause() {
        this.state.isPlay = false;
        this.state.animationFrame && this.state.animationFrame.stop();
        this.context.trigger(`pause`);
    }

    mute() {

    }

    unMute() {

    }

    seek(to) {
        this.state.nowFrame = Math.floor(to);
        this._render(this.state.nowFrame);
        this.context.trigger(`seek`);
    }

    getDuration() {
        return this.state.totalFrame;
    }

    getCurrent() {
        return this.state.nowFrame;
    }
}

export default GifPlayer;
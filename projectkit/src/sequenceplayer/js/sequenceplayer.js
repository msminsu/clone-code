import AnimationFrame from '../../util/animationFrame';

class SequencePlayer {
    constructor(_option){
        if(_option && !document.querySelector(_option.el)) {
            throw new TypeError(`no ${_option.el} DOM Element`);
        }

        this.context = $(_option.el);

        this.config = $.extend({
            path: '',
            prefix: 'sequence_',
            type: 'png',
            loop: false,
            autoPlay: false,
            delay: 0,
            fps: 60,
            frame: 0,
            preDecode: false
        }, _option);

        this.state = {
            animationFrame: false,
            isPlay: false,
            fps: this.config.fps,
            nowFrame: 0,
            totalFrame: this.config.frame
        };

        this.loadCount = 0;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.sequence = [];

        this.canvas = $(`<canvas></canvas>`);

        this._setCanvas();
    }

    _setCanvas(){
        this.context.append(this.canvas);
        this.canvasContext = this.canvas[0].getContext('2d');
        this._loadData();
    }

    _loadData(i = 0){
        const img = new Image();
        img.src = `${this.config.path}/${this.config.prefix}${i}.${this.config.type}`;
        img.onload = () => this._loadComplete(img);
    }

    _loadComplete(img){
        this.sequence.push(img);
        this.loadCount += 1;

        if(this.loadCount < 2) {
            this.screenWidth = this.sequence[0].width;
            this.screenHeight = this.sequence[0].height;

            this.canvas.attr({
                width: this.screenWidth,
                height: this.screenHeight,
            });

            if(this.config.preDecode) {
                this.canvas.css({
                    display: 'none'
                });
            }
        }

        if(this.config.preDecode) {
            this.canvasContext.drawImage(img, 0, 0);
        }

        if(this.loadCount < this.state.totalFrame) {
            this._loadData(this.loadCount);
            return;
        }

        this._handleReady();
    }

    _handleReady(){
        this.screenWidth = this.sequence[0].width;
        this.screenHeight = this.sequence[0].height;

        if(this.config.preDecode) {
            this.canvasContext.clearRect(0, 0, this.screenWidth, this.screenHeight);
            this.canvas.css({
                display: 'block'
            });
        }

        this.context.trigger('ready');

        this.config.autoPlay && setTimeout(() =>{
            this.play();
        }, this.config.delay);
    }

    _render(q){
        this.canvasContext.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.canvasContext.drawImage(this.sequence[q], 0, 0);
        this.state.nowFrame = q + 1;
    }

    play(to){
        if(this.state.isPlay) return;
        this.state.isPlay = true;
        to > -1 && this.seek(to);
        this.context.trigger(`play`);

        this.state.animationFrame = new AnimationFrame(() =>{
            if(this.state.nowFrame >= this.state.totalFrame) {
                this.state.isPlay = false;
                this.state.animationFrame.stop();
                this.context.trigger(`end`);
                this.config.loop && this.play(0);
                return;
            }
            this._render(this.state.nowFrame);
        }, this.state.fps);
        this.state.animationFrame.start();
    }

    pause(){
        this.state.isPlay = false;
        this.state.animationFrame && this.state.animationFrame.stop();
        this.context.trigger(`pause`);
    }

    stop(){
        this.state.isPlay = false;
        this.state.animationFrame && this.state.animationFrame.stop();
        this._render(0);
        this.context.trigger(`stop`);
    }

    seek(to){
        this.state.nowFrame = to;
        this._render(this.state.nowFrame);
        this.context.trigger(`seek`);
    }

    on(event, func){
        this.context.on(event, func);
    }

    off(event){
        this.context.off(event);
    }

    get info(){
        return this.state;
    }
}

export default SequencePlayer;
import isMobile from "../../util/isMobile";

export class Layer {
    constructor(options){
        this.config = {
            ...{
                "el": "",
                "name": "promo-layer",
                "duration": 300,
                "fade": false,
                "esc": false,
                "padding": 20,
                "dim": false,
                "dimClickClose": false,
                "onStartOpen": false,
                "onStartClose": false,
                "onCompleteOpen": false,
                "onCompleteClose": false
            }, ...options
        };

        this.state = {
            isActive: false,
            openTarget: $(this.config.el),
            offsetTop: 0
        };

        this.DOM = {
            HTML: $("html"),
            BODY: $("body"),
            LAYER: false,
            LAYERCONTENTS: false,
            CONTENTS: false,
            BACKDROP: false,
            TEMPLATE: false
        };

        this.EVENT = {
            OPENSTART: "layeropenstart",
            OPENEND: "layeropenend",
            CLOSESTART: "layerclosestart",
            CLOSEEND: "layercloseend"
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this._init();
    }

    _init(){
        this._setLayer();
        this._setLayerContents($(`${this.config.el}`));
        this._setLayerBackDrop();
        this._addEvent();
    }

    _setLayer(){

        this.DOM.LAYER = $(`<div class="${this.config.name}">
                                    <div class="${this.config.name}__contents"></div>
                                    <div class="${this.config.name}__dim"></div>
                                </div>`);

        if(isMobile()){
            this.DOM.LAYER.addClass("mobile");
        }

        this.DOM.LAYER = $(this.DOM.LAYER).appendTo("body");
    }

    _setLayerContents(contents){
        this.DOM.LAYERCONTENTS = this.DOM.LAYER.find(`.${this.config.name}__contents`);
        this.DOM.LAYERCONTENTS.empty();
        this.DOM.LAYERCONTENTS.append(contents);
        this.DOM.CONTENTS = $(contents);

        this.DOM.CONTENTS.css({
            "margin-top": `${this.config.padding}px`,
            "margin-bottom": `${this.config.padding}px`
        });
    }

    _setLayerBackDrop(){
        this.DOM.BACKDROP = $(this.DOM.LAYER).find(`.${this.config.name}__dim`);
    }

    _addEvent(){
        if(this.config.dimClickClose){

            $(this.DOM.LAYER).find(`.${this.config.name}__contents`).on("click.ui.layer", (e) =>{
                if($(e.target).is(`.${this.config.name}__contents`)){
                    this.close();
                }
            });
        }

        if(this.config.esc){
            $(document).on("keyup.ui.layer", (e) =>{
                if(e.keyCode === 27){
                    this.close();
                }
            });
        }

    }

    _toggleLayer(isActive, event){
        if(isActive){
            this.DOM.LAYERCONTENTS.removeClass(`${this.config.name}__contents_active`);

            this.DOM.LAYER.fadeOut(this.config.fade ? this.config.duration : 0, () =>{
                this.DOM.HTML.removeClass(`${this.config.name}_open`);
                this.DOM.BODY.removeClass(`${this.config.name}_open`);
                $("html, body").scrollTop(this.state.offsetTop);
                this.DOM.LAYER.trigger(event);
            });

            return;
        }

        setTimeout(() =>{
            this.DOM.LAYERCONTENTS.addClass(`${this.config.name}__contents_active`);
        }, 1);

        let htmlTop = this.DOM.HTML.scrollTop();
        let bodyTop = this.DOM.BODY.scrollTop();

        if(htmlTop < 1 && bodyTop < 0){
            this.state.offsetTop = 0;
        } else {
            this.state.offsetTop = htmlTop > 0 ? htmlTop : bodyTop;
        }

        this.DOM.HTML.addClass(`${this.config.name}_open`);
        this.DOM.BODY.addClass(`${this.config.name}_open`);

        this.DOM.LAYER.fadeIn(this.config.fade ? this.config.duration : 0, () =>{
            $(window).trigger("resize");
            this.DOM.LAYER.trigger(event);
        });
    }

    _toggleBackdrop(isActive){
        if(isActive){
            this.DOM.BACKDROP.fadeOut(this.config.fade ? this.config.duration : 0);
            return;
        }

        this.DOM.BACKDROP.fadeIn(this.config.fade ? this.config.duration : 0);
    }

    open(contents){
        contents && this._setLayerContents(contents);

        if(this.state.isActive) return;
        this.state.isActive = true;
        this.DOM.LAYER.trigger(this.EVENT.OPENSTART);
        this._toggleLayer(false, this.EVENT.OPENEND);
        this.config.dim && this._toggleBackdrop(false);
        window.activeLayer = this;
    }

    close(){
        if(!this.state.isActive) return;
        this.state.isActive = false;
        this.DOM.LAYER.trigger(this.EVENT.CLOSESTART);
        this._toggleLayer(true, this.EVENT.CLOSEEND);
        this.config.dim && this._toggleBackdrop(true);
    }

    on(event, callback){
        this.DOM.LAYER.on(event, callback);
    }

    off(event){
        this.DOM.LAYER.off(event);
    }
}

let layerMap = {};
let openedLayerId = "";

$("[data-layer='open']").each(function (){
    let id = $(this)[0].hash || $(this).data("href");
    $(this).data("layerId", id);

    layerMap[id] = new Layer({
        "el": id,
        "fade": true,
        "esc": true,
        "dim": true,
        "dimClickClose": true
    });
});

let close = () =>{
    layerMap[openedLayerId].close();
};

let open = (id) =>{
    openedLayerId = id;
    window.activeLayer && window.activeLayer.close();
    layerMap[id].open();
};

$(document).on("click.promo.layer", "[data-layer='open']", function (e){
    e.preventDefault();
    window.activeLayer && window.activeLayer.close();
    open($(this).data("layerId"));
});

$(document).on("click.promo.layer", "[data-layer='close']", function (e){
    e.preventDefault();
    close();
});

export let layer = {
    open,
    close
};
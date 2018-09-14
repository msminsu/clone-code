class YoutubeLoader {
    constructor(id, props){
        this.props = props;
        this.loaded = false;

        $(window).on(`canplay.${id}`, () =>{
            this.loaded = true;
            this.props._onSuccess('youtube', `success: ${id}`);
        });

        setTimeout(() =>{
            !this.loaded && this.props._onFail('youtube', `fail: ${id}`);
        }, 5 * 1000)
    }
}

export default YoutubeLoader;
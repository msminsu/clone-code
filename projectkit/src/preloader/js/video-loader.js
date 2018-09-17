class VideoLoader {
    constructor(url, props){
        this.props = props;

        const video = document.createElement('video');
        video.src = url;

        let checkState = setInterval(() =>{
            if(video.readyState > 2) {
                clearInterval(checkState);
                this.props._onSuccess('video', `success: ${url}`);
            }
        }, 100);

        video.onerror = () => this.props._onFail('video', `fail: ${url}`);
    }
}

export default VideoLoader;
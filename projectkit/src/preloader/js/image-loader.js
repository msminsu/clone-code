class ImageLoader {
    constructor(url, props){
        this.props = props;

        const img = new Image();
        img.src = url;

        img.onload = () => this.props._onSuccess('image', `success: ${url}`);
        img.onerror = () => this.props._onFail('image', `fail: ${url}`);
    }
}

export default ImageLoader;
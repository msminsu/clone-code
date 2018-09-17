const loadJs = (src, callback) =>{
    const script = document.createElement('script');

    script.setAttribute('src', src);

    if(script.readyState) {
        script.onreadystatechange = function(){
            if(script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback && callback();
            }
        }
    } else {
        script.onload = function(){
            callback && callback();
        };
    }

    document.getElementsByTagName('head')[0].appendChild(script);

    return false;
};

export default loadJs;
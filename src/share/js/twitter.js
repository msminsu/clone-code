/**
 * twitter 공유하기
 * https://dev.twitter.com/web/tweet-button/web-intent
 * @param shareUrl
 * @param text
 */
let shareTwitter = (shareUrl = location.href, text = document.title) =>{
    let url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;

    window.open(url);
};

export default shareTwitter;
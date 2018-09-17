/**
 * google plus 공유하기
 * https://developers.google.com/+/web/share/#share-link
 * @param shareUrl
 */
let shareGooglePlus = (shareUrl = location.href) =>{
    let url = "https://plus.google.com/share?url=" + encodeURIComponent(shareUrl);

    window.open(url);
};

export default shareGooglePlus;
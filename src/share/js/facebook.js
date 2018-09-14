/**
 * facebook 공유하기
 * @param shareUrl
 */
let shareFacebook = (shareUrl = location.href) =>{
    let url = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(shareUrl);

    window.open(url);
};

export default shareFacebook;
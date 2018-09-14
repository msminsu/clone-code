/**
 * line 공유하기
 * @param shareUrl
 */
let shareLine = (shareUrl = location.href) =>{
    let url = `${encodeURIComponent(shareUrl)}`;
    let title = $('[property="og:title"]').attr('content');

    window.open(`http://line.me/R/msg/text/?${title} ${url}`);

};

export default shareLine;
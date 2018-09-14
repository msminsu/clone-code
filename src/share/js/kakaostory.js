/**
 * kakao story 공유하기
 * @param shareUrl
 */
let shareKakaoStory = (shareUrl = location.href) =>{
    let shareWindowName = 'kakaoStoryShare';
    let url = 'https://story.kakao.com/share?url=' + encodeURIComponent(shareUrl);

    window.open(url, shareWindowName, 'width=530, height=480, resizable=no, scrollbars=no, status=no');
};

export default shareKakaoStory;
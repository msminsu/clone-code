import isOs from '../../util/isOs';
import isMobile from '../../util/isMobile';
import {openMessage} from '../../message/js/message';

/**
 *
 * URL 공유하기
 * @param shareUrl
 */
let copyUrl = (shareUrl = location.href) =>{
    window.getSelection().removeAllRanges();

    $('#shareUrl').remove();

    $('body').append(`<span id="shareUrl" style="position: fixed;left:-9999px;top:0; z-index:-1;">${shareUrl}</span>`);

    let urlField = document.querySelector('#shareUrl');
    let range = document.createRange();

    range.selectNode(urlField);
    window.getSelection().addRange(range);
    document.execCommand('copy');

    if(isOs('samsung') || isOs('lg')) return;

    if(isMobile()) {
        openMessage('URL 복사가 완료 되었습니다.');
    } else {
        alert('URL 복사가 완료 되었습니다.');
    }

};

export default copyUrl;

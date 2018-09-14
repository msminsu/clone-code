/**
 *
 * @param href
 * @returns {*}
 */
const staticUrl = (href = location.href) =>{
    let url;

    if(/rc\./i.test(href) || /rc-/i.test(href)) {
        url = 'https://rc-wstatic.plaync.co.kr';
    }
    else if(/local|localhost|opdev|ui-static|file:/i.test(href)) {
        url = 'http://ui-static.korea.ncsoft.corp';
    }
    else {
        url = 'https://wstatic-cdn.plaync.com';
    }

    return url;
};

export default staticUrl;
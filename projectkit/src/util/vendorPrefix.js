import nowBrowser from './nowBrowser';

/**
 * vendor prefix 설정
 * @param now
 * @returns {*}
 */
const vendorPrefix = (now = nowBrowser()) =>{
    const prefix = {
        IE11: '-ms-',
        IE10: '-ms-',
        IE9: '-ms-',
        Chrome: '-webkit-',
        Opera: '-o-',
        Firefox: '-moz-',
        Safari: '-webkit-',
    };

    return prefix[now];
};

export default vendorPrefix;
/**
 * 브라우저 쿠키 설정
 * @param key
 * @param value
 * @param expires ( Number:1~365, String: '2017/12/23 23:59:59', Object:{'day': 1, 'hour': 23, 'min': 59, 'sec': 59} )
 */
const setCookie = (key, value, expires = 1) =>{
    let now = new Date();

    switch(typeof expires) {
        case 'number':
            now.setDate(now.getDate() + expires);
            break;

        case 'string':
            let end = new Date(expires) - now;
            now.setDate(now.getDate() + Math.floor(( end / (1000 * 60 * 60 * 24))));
            now.setHours(now.getHours() + Math.floor(( end % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            now.setMinutes(now.getMinutes() + Math.floor(( end % (1000 * 60 * 60)) / (1000 * 60)));
            now.setSeconds(now.getSeconds() + Math.floor(( end % (1000 * 60)) / 1000));
            break;

        case 'object':
            now.setDate(now.getDate() + expires.day);
            now.setHours(now.getHours() + expires.hour);
            now.setMinutes(now.getMinutes() + expires.min);
            now.setSeconds(now.getSeconds() + expires.sec);
            break;
    }

    document.cookie = key + '=' + value + ';path=/;' + 'domain=' + document.domain.substring(document.domain.indexOf(".plaync") + 1) + ';expires=' + now.toUTCString();
};

export default setCookie;
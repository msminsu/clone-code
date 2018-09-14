import setcookie from './setcookie';

/**
 * 브라우저 쿠키 삭제
 * @param key
 */
const delCookie = (key) =>{
    if(!document.cookie) {
        return;
    }

    setcookie(key, null, -1);
};

export default delCookie;
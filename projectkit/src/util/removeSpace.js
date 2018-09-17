/**
 * 공백 제거
 * @param str
 * @returns {*|void|string|XML}
 */

const removeSpace = (str) =>{
    return str.replace(/\s/gi, '');
};

export default removeSpace;
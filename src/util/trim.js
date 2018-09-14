/**
 * 문자 앞 뒤 공백 제거
 * @param str
 * @returns {string|XML}
 */
const trim = (str) =>{
    if(String.prototype.trim) {
        return str.trim();
    }

    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

export default trim;
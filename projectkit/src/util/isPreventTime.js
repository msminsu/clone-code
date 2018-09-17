/**
 * 일정시간 동안 false를 반환
 *
 * @param diffTime - 기준시간
 * @param to - true를 얻기 위한 기준시간 부터 경과 시간(1/1000 s)
 * @returns {boolean}
 */
const isPreventTime = (diffTime, to = 1500) =>{
    return (new Date().getTime() - diffTime) < to;
};

export default isPreventTime;
/**
 * 마우스휠 이벤트 방향 감지
 *
 * @param e - mouse wheel event(mousewheel DOMMouseScroll)
 * @returns {number} - Return direction(up: -1 , down: 1)
 * @example
 *
 *  $(window).on('mousewheel DOMMouseScroll', function(e){
 *      getWheelDirection(e)
 * });
 *
 */

const getWheelDirection = (e) =>{
    if(e.type === "DOMMouseScroll") return e.originalEvent.detail > 0 ? 1 : -1;
    if(e.originalEvent.wheelDeltaY) return e.originalEvent.wheelDeltaY > 0 ? -1 : 1;
    return e.originalEvent.wheelDelta > 0 ? -1 : 1;
};

export default getWheelDirection;
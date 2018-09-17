import removespace from '../util/removeSpace';
import gamename from '../util/gameName';

let pageTitle = removespace(document.title).split(':plaync')[0];

/**
 * trk click Trace logger
 * @param clickTraceStr
 */
const trace = (clickTraceStr) =>{
    if(typeof _trk_clickTrace !== 'function') {
        window._trk_clickTrace = function(param1, param2){
            console.log(`_trk_clickTrace('${param1}','${param2}')`);
        };
    }

    _trk_clickTrace('EVT', clickTraceStr);
};

$(document).on('click.promo.trace', '[data-trace]', function(){
    trace(`/${gamename().ko}/이벤트프로모션/${pageTitle}/${$(this).attr('data-trace')}`);
});

export default trace;
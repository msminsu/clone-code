import environment from '../util/environment';
import loadCss from '../util/loadCss';
import loadJs from '../util/loadJs';

let nccommunityJs = 'https://wstatic-cdn.plaync.com/uikit/nccommunity/js/index.js';
let nccommunityCss = 'https://wstatic-cdn.plaync.com/uikit/nccommunity/css/comment.css';

class PromoComment {
    constructor(options){
        loadCss(nccommunityCss);

        let articleId = typeof options.articleId === 'object' ? options.articleId[environment()] : options.articleId;

        let config = {
            board: 'promotioncomment',
            isMyProfile: false,
            isNcAccount: true,
            isShowCommentOrderType: false,
            articleId: articleId,
            isPaging: typeof options.isPaging === 'undefined' ? true : options.isPaging,
            isNoReply: !options.replay,
            commentListSize: options.size || 5,
            commentTextMaxCount: options.max || 300,
            apiPath: options.apiPath || '/events/api/'
        };

        window.userData = options.userData;
        window._path = config.apiPath;

        if(options.max && options.max !== 300) {
            config.commentPlaceholder = '댓글은 ' + options.max + '자 까지 작성 가능합니다.';
        }

        loadJs(nccommunityJs, function(){
            let _comment = new ui.ncCommunity.CommentSingle($(options.el), config);
            _comment.get();
        });
    }
}

export default PromoComment;
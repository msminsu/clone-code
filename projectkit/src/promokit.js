import "./trace/trace";

import * as message from "./message/js/message";
import cookie from "./cookie/cookie";
import * as layer from "./layer/js/layer";
import Player from "./player/js/player";
import Sequenceplayer from "./sequenceplayer/js/sequenceplayer";
import Preloader from "./preloader/js/preloader";
import Cnb from "./cnb/cnb";
import Comment from "./comment/comment";
import share from "./share/js/share";
import remote from "./remote/js/remote";
import plugin from "./plugin/js/plugin";
import util from "./util/util";
import swipers from "./swipers/js/swipers";

plugin();
share.init();

export default {
    Cnb,
    Comment,
    cookie,
    ...layer,
    ...message,
    Player,
    Sequenceplayer,
    Preloader,
    share,
    remote,
    util,
    swipers
};

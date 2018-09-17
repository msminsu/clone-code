import gamename from '../util/gameName';
import environment from '../util/environment';

const gameInfo = gamename();

const api = {
    local: 'http://opdev.api.lineage.plaync.com',
    rc: 'https://rc-apilineage.plaync.com',
    live: 'https://api-lineage.plaync.com'
};

const coupon = {
    local: 'http://lineagenshop.plaync.com/lineage/coupon/popup/couponProfileRegisterForm?gameCode=31',
    rc: 'http://rc.lineagenshop.plaync.com/lineage/coupon/popup/couponProfileRegisterForm?gameCode=31',
    live: 'http://lineagenshop.plaync.com/lineage/coupon/popup/couponProfileRegisterForm?gameCode=31'
};

const apiPath = api[environment()];
const couponPath = coupon[environment()];

class Cnb {
    constructor(options) {
        let cnbConfig = {
            'type': 'B',
            'bi': {
                'title': `${gameInfo.en}`,
                'url': '/',
                'image': {}
            },
            'header': {
                'large': 'rgba(16,16,16,0.8)',
                'medium': 'rgba(16,16,16,0.8)',
                'mediumSticky': '#5c443b',
                'lnb': '#c69c7c'
            },
            'useLeftMenu': true,
            'useJoinMenu': true,
            'joinURL': `http://search.plaync.com/${gameInfo.en}/index.jsp`,
            'useGameStart': 'mobileGameDown',
            'gameStart': {
                'markUp': '<a href="#" class="ncc-gamestart-btn__start">다운로드</a>'
            },
            'mobileGameDown': {
                'showAndro': true,
                'showIos': true,
                'appName': '',
                'iosAppLink': '',
                'androAppLink': ''
            },
            'search': {
                'isShow': false,
                'destUrl': `http://search.plaync.com/${gameInfo.en}/index.jsp`,
                'site': `${gameInfo.en}`,
                'callback': 'suggestKeyword',
                'collection': `${gameInfo.en}1query`,
                'display': 10,
                'pos': 'lnb',
                'where': `${gameInfo.en}^tsearch`
            },
            'lnbData': [],
            'active': {
                'd1': 0,
                'd2': 0
            },
            'shortCut': {
                enterCoupon: {
                    url: couponPath
                }
            },
            'appDownloadData': {
                'isShow': false,
                'appList': []
            },
            'loginFN': 'GNBLogin',
            'logoutFN': 'GNBLogout',
            'useCharChangeMenu': false,
            'charChangeFN': 'characterChange'
        };

        if (typeof options.image === 'object') {
            cnbConfig.bi.image = {
                'large': {
                    'path': options.image.large,
                    'style': {
                        'width': 82,
                        'height': 26,
                        'marginTop': 15
                    }
                },
                'medium': {
                    'path': options.image.medium,
                    'style': {
                        'width': 82,
                        'height': 26,
                        'marginTop': 15
                    }
                },
                'sticky': {
                    'path': options.image.mediumSticky,
                    'style': {
                        'width': 82,
                        'height': 26,
                        'marginTop': 15
                    }
                },
                'lnb': {
                    'path': options.image.lnb,
                    'style': {
                        'width': 82,
                        'height': 26,
                        'marginTop': 15
                    }
                }
            };
        } else {
            cnbConfig.bi.image = {
                'path': options.image,
                'style': {
                    'width': 82,
                    'height': 26,
                    'marginTop': 15
                }
            };
        }

        cnbConfig.header = options.color;

        $.ajax({
            url: `${apiPath}/api/main/cnb/userData`,
            xhrFields: {withCredentials: true}
        }).done(function(data) {
            window.userData = data;
            window.userData.isLogin = data.login;
            window.cnb.start(cnbConfig);
        });
        
        window.openPopup = function (obj, objWidth, objHeight, objName, objScroll, deny, objFull, addParam) {
            try {
                if(objScroll !== 1 && objScroll !== 0 && objScroll !== '1' && objScroll !== '0') {
                    var objScrollCopy = objScroll;
                    objScroll = objName;
                    objName = objScrollCopy;
                }
                
                if(typeof(obj) == 'string') {
                    var setup = 'width=' + objWidth + ',height=' + objHeight + ',toolbar=no,location=no,status=no,menubar=no,top=20,left=20,scrollbars=' + objScroll + ',resizable=no';
                    if(objName == '' || !objName) objName = 'popup';
                    if(objFull) setup = 'fullscreen=1,scrollbars=0';
                    
                    var win = window.open(obj, objName, setup);
                    if(win != null) win.focus();
                    
                    return win;
                }
                
                if(!objName) objName = 'popup';
                if(!objScroll) objScroll = 'auto';
                
                var url = addParam ? obj.href + '?' + addParam : obj.href;
                var setup = 'width=' + objWidth + ',height=' + objHeight + ',toolbar=no,location=no,status=no,menubar=no,top=20,left=20,scrollbars=' + objScroll + ',resizable=no';
                
                if(objFull) setup = 'fullscreen=1,scrollbars=0';
                var win = window.open(url, objName, setup);
                
                if(deny) {
                    if(win == null) {
                        alert('팝업 차단을 해제하여 주시기 바랍니다.');
                    } else {
                        win.focus();
                    }
                }
                
                return win;
                
            } catch (e) {
                //
            }
        };
        
        window.openPopupUnban = function (url) {
            openPopup(url, 580, 370, 'unban', 1, 1);
            return false;
        };
        
    }
}

export default Cnb;
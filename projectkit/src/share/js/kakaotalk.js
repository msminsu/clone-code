import trim from '../../util/trim'
import loadJs from '../../util/loadJs'

/**
 *  kakao talk 공유하기
 * @param options
 */
const shareKakaoTalk = (options) =>{
    let config = Object.assign({
        shareUrl: location.href,
        shareTitle: trim(document.title.split(/\:\s+plaync/)[0]),
        shareDescription: document.querySelector('[property="og:description"]') ? document.querySelector('[property="og:description"]').content : document.querySelector('[name="description"]').content,
        imageSrc: document.querySelector('[property="og:image"]').content,
        imageWidth: 300,
        imageHeight: 157,
        buttonText: '자세히 보기'
    }, options);

    const getKey = (loc) =>{

        if(/bns.plaync.co/.test(loc)) {
            return '7a41aad1eebf7e5b4b68db7204aeb574';
        }

        else if(/lineage.plaync.co/.test(loc)) {
            return 'cc821832de1815dfefd89696a8328808';
        }

        else if(/lineagem.plaync.co/.test(loc)) {
            return 'cc821832de1815dfefd89696a8328808';
        }

        else if(/lineage2.plaync.co/.test(loc)) {
            return '5c2686ba412a29a8fb2942339184d320';
        }

        else if(/aion.plaync.co/.test(loc) || /aionnew.plaync.co/.test(loc)) {
            return '6c3e99b13fbec7bc6c4d699de19d8e3a';
        }

        else if(/event.plaync.co/.test(loc)) {
            return '938e491a6a7a61dee6ad1293a191d999';
        }

        else if(/pangyam.plaync.co/.test(loc)) {
            return 'fed893c76cbaa6fe574a28bb723c4906';
        }

        else if(/power.plaync.co/.test(loc)) {
            return 'b18b4f83affd1baa323d43cb76ccde55';
        }

        else if(/fb.plaync.co/.test(loc)) {
            return '938e491a6a7a61dee6ad1293a191d999';
        }

        else if(/plaync.co/.test(loc) || /asia.nc.com/.test(loc)) {
            return '787f3aa15494fd0879123c1cce573c9b';
        }

        return 'address error';
    };
    
    let settings = {
        objectType: 'feed',
        content: {
            title: config.shareTitle,
            description: config.shareDescription,
            
            imageUrl: config.imageSrc,
            imageWidth: config.imageWidth,
            imageHeight: config.imageHeight,
            
            link: {
                webUrl: config.shareUrl,
                mobileWebUrl: config.shareUrl
            }
            
        },
        buttonTitle: config.buttonText
    };

    let kakaoKey = getKey(config.shareUrl);
    
    if(window.Kakao) {
        Kakao.cleanup();
        window.Kakao.init(kakaoKey);
        window.Kakao.Link.sendDefault(settings);
        return;
    }
    
    loadJs('https://developers.kakao.com/sdk/js/kakao.min.js', () =>{
        Kakao.cleanup();
        window.Kakao.init(kakaoKey);
        window.Kakao.Link.sendDefault(settings);
    });
};

export default shareKakaoTalk;
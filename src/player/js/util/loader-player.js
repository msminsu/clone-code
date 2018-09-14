import PlayerYoutube from '../player-youtube';
import PlayerVideo from '../player-video';
import PlayerGif from '../player-gif';
import GetTemplate from './get-template';

const playerList = {
    video: PlayerVideo,
    youtube: PlayerYoutube,
    gif: PlayerGif,
};

const loadPlayer = (props) => {
    let sourceType = props.sourceType;

    let template = GetTemplate({poster: props.config.poster, controls: props.config.controls, type: props.sourceType, videoId: props.config.videoId, playerId: props.config.playerId});

    if (sourceType === 'youtube') {
        if (!window.loadYoutubeApi) {
            window.loadYoutubeApi = true;
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        let check = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(check);
                props.player = new playerList[sourceType](props, template);
            }
        }, 200);

        return;
    }

    props.player = new playerList[sourceType](props, template);
};

export default loadPlayer;
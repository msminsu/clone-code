const getTemplate = (options) => {
    let controls = options.controls ?
        `<div class="player__controls player--hide">
            <div class="player__progress">
                <div class="player__progress-bar"></div>
            </div>
            <button type="button" class="player__play player__play_show">재생</button>
            <button type="button" class="player__pause">정지</button>
        </div>` : '';

    let background = () => {
        if (options.poster) {
            return `<div class="player__poster player--hide" style="background:url('${options.poster}') 50% 50% no-repeat"></div>`;
        }
        if (options.type === 'youtube') {
            return `<div class="player__poster player--hide" style="background:url('https://img.youtube.com/vi/${options.videoId}/sddefault.jpg') no-repeat 50% 50%"></div>`;
        }
        return `<div class="player__poster player--hide"></div>`;
    };

    let source = () => {
        if (options.type === 'video') {
            return `<video id="${options.playerId}" playsinline><source src="${options.videoId}" type="video/mp4"></video>`;
        }
        if (options.type === 'youtube') {
            return `<div id="${options.playerId}"></div>`;
        }
        if (options.type === 'gif') {
            return `<canvas id="${options.playerId}"></canvas>`;
        }
    };

    return `<div class="player__context player--hide">
                ${source()}
            </div>
            <div class="player__cover player--hide"></div>
            ${background()}
            ${controls}
            <div class="player__loading-spinner"></div>`;
};

export default getTemplate;
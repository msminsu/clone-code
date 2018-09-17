const template = `<div class="message message--landscape-alert">
                     <div class="message__contents">
                        <p>세로 모드만 지원되는 페이지 입니다.</p>
                        <p>화면을 세로로 전환시켜주세요.</p>
                    </div>
                  </div>`;

const messageLandscape = () =>{
    $('body').append(template);
};

export default messageLandscape
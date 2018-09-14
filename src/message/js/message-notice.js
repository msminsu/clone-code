import {Layer} from '../../layer/js/layer';

class MessageNotice extends Layer {
    constructor(options){
        super(options);
        this.resolve = false;
        this.addEvent();
    }

    openMessage(msg = '메세지를 입력해주세요.', resolve){
        const template = `<div class="message message--notice">
                            <div class="message__contents">
                                <div class="message__text-area">
                                    <p>${msg}</p>
                                </div>
                        
                                <div class="message__button-area">
                                    <button class="message__button message__button--check">확인</button>
                                </div>
                            </div>
                        </div>`;

        this.resolve = resolve;
        this.open(template);
    }

    closeMessage(run){
        run && run();
        this.resolve = false;
        this.close();
    }

    addEvent(){
        $(document).on('click', '.message__button--check', (e) =>{
            e.preventDefault();
            this.closeMessage(this.resolve);
        });
    }
}

export default MessageNotice;

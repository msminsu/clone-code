import {Layer} from '../../layer/js/layer';

class MessageConfirm extends Layer {
    constructor(options){
        super(options);
        this.resolve = false;
        this.reject = false;
        this.addEvent();
    }

    openConfirm(msg = '메세지를 입력해주세요.', resolve, reject){
        const template = `<div class="message message--notice">
                            <div class="message__contents">
                                <div class="message__text-area">
                                    <p>${msg}</p>
                                </div>
                        
                                <div class="message__button-area">
                                    <button class="message__button message__button--cancel">취소</button>
                                    <button class="message__button message__button--confirm">확인</button>
                                </div>
                            </div>
                        </div>`;

        this.resolve = resolve;
        this.reject = reject;

        this.open(template);
    }

    closeConfirm(run){
        run && run();
        this.resolve = false;
        this.reject = false;
        this.close();
    }

    addEvent(){
        $(document).on('click', '.message__button--cancel', (e) =>{
            e.preventDefault();
            this.closeConfirm(this.reject);
        });

        $(document).on('click', '.message__button--confirm', (e) =>{
            e.preventDefault();
            this.closeConfirm(this.resolve);
        });
    }
}

export default MessageConfirm;

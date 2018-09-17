import MessageNotice from './message-notice';
import MessageConfirm from './message-confirm';
import messageLandscape from './message-landscape';
import isMobile from '../../util/isMobile';

isMobile() && messageLandscape();

const message = new MessageNotice({
    'data': '',
    'fade': true,
    'esc': true,
    'dim': true
});

const confirm = new MessageConfirm({
    'data': '',
    'fade': true,
    'esc': true,
    'dim': true
});

export const openMessage = (str, resolve) =>{
    message.openMessage(str, resolve);
};

export const closeMessage = () =>{
    message.closeMessage();
};

export const openConfirm = (str, resolve, reject) =>{
    confirm.openConfirm(str, resolve, reject);
};

export const closeConfirm = (reject) =>{
    confirm.closeConfirm(reject);
};

$(document).on('click.promo.alert', '[data-alert]', function (e){
    e.preventDefault();
    let alertMessage = $(this).attr('data-alert').replace(/\\n/, '\n');
    alert(alertMessage);
});

$(document).on('click.promo.message', '[data-message]', function (e){
    e.preventDefault();
    let str = $(this).attr('data-message').replace(/\\n/, '\n');
    message.openMessage(str);
});
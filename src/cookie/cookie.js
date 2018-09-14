import trim from '../util/trim';
import getcookie from './getcookie';
import setcookie from './setcookie';
import delcookie from './delcookie';

$(document).on('click.promo.cookie', '[data-cookie]', function(e){
    e.preventDefault();

    setcookie(
        trim($(this).attr('data-cookie').split(',')[0]),
        trim($(this).attr('data-cookie').split(',')[1]),
        !!$(this).attr('data-cookie').split(',')[2] ? Number(trim($(this).attr('data-cookie').split(',')[2])) : 1
    );

    if($(this).attr('data-redirect')) {
        document.location.href = $(this).attr('data-redirect');
    }
});

export default {
    getcookie,
    setcookie,
    delcookie
};
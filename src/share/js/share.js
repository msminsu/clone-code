import removespace from "../../util/removeSpace";
import trim from "../../util/trim";
import gamename from "../../util/gameName";
import isMobile from "../../util/isMobile";
import trace from "../../trace/trace";

import facebook from "./facebook";
import twitter from "./twitter";
import kakaostory from "./kakaostory";
import kakaotalk from "./kakaotalk";
import googleplus from "./googleplus";
import line from "./line";
import copyurl from "./copyurl";

const init = () => {
    let pageTitle = removespace(document.title).split(":plaync")[0];
    
    const getShareBox = (list) => {
        let button = "";
        for (let i = 0, max = list.length; i < max; i++) {
            button += `<a href="#none" class="share__button share__button--${list[i]}" data-share="${list[i]}">${list[i]} 공유하기</a>`;
        }
        return `<button class="share__toggle">
                <svg version="1.1" class="share__toggle-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54 54" xml:space="preserve">
                    <path class="share__toggle-path" d="M33.5,30c-1.7,0-3.2,0.9-4.1,2.1l-7.3-3.2c0.2-0.6,0.4-1.2,0.4-1.9s-0.1-1.3-0.4-1.9l7.3-3.2 c0.9,1.3,2.4,2.1,4.1,2.1c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5c0,0.5,0.1,1,0.3,1.5l-7.5,3.3C20.4,22.7,19,22,17.5,22 c-2.8,0-5,2.2-5,5s2.2,5,5,5c1.5,0,2.9-0.7,3.8-1.8l7.5,3.3c-0.2,0.5-0.3,1-0.3,1.5c0,2.8,2.2,5,5,5s5-2.2,5-5 C38.5,32.3,36.3,30,33.5,30z M33.5,16c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S31.8,16,33.5,16z M17.5,30c-1.7,0-3-1.3-3-3s1.3-3,3-3	s3,1.3,3,3S19.1,30,17.5,30z M33.5,38c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S35.2,38,33.5,38z"/>
	                <path class="share__toggle-path" d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27s27-12.1,27-27S41.9,0,27,0z M27,52.6C12.9,52.6,1.4,41.1,1.4,27S12.9,1.4,27,1.4S52.6,12.9,52.6,27S41.1,52.6,27,52.6z"/>
                </svg>
            </button>
            <div class="share__list">${button}</div>`;
    };
    
    $(".share").each(function (){
        $(this).append(getShareBox(["facebook", "twitter", "googleplus", "kakaotalk", "line", "url"]));
        
        if(isMobile()){
            $(this).addClass("share--mobile");
        }
    });
    
    const resetPosition = (shareArea) => {
        let dom_share = shareArea;
        let dom_shareList = dom_share.find(".share__list");
        
        let width_list = dom_shareList.width();
        let width_screen = $("body").width();
        let width_button = dom_share.find(".share__toggle").width();
        
        let value_adjust = (width_list - width_button) / 2;
        
        let offset_shareLeft = dom_share.offset().left;
        let offset_shareRight = offset_shareLeft + width_button;
        let offset_shareCenter = offset_shareLeft + (width_button / 2);
        
        let offset_shareListLeft = offset_shareLeft - value_adjust;
        let offset_shareListRight = offset_shareRight + value_adjust;
        
        let offset_screenLeft = 0;
        let offset_screenRight = width_screen;
        let offset_screenCenter = width_screen / 2;
        
        let position_shareList = -value_adjust;
        let position_shareListLeft = offset_screenLeft;
        let position_shareListRight = -value_adjust * 2;
        let position_shareListCenter = -value_adjust + (offset_screenCenter - offset_shareCenter);
        
        if(offset_shareListLeft < 0){
            position_shareList = position_shareListLeft;
        }
        
        if(offset_shareListRight > offset_screenRight){
            position_shareList = position_shareListRight;
        }
        
        if(position_shareListLeft > position_shareListCenter && position_shareListRight < position_shareListCenter){
            position_shareList = position_shareListCenter;
        }
        
        dom_shareList.css({left: position_shareList});
    };
    
    $(document).off(isMobile() ? "touchstart.promo.share" : "click.promo.share");
    $(document).off("click.promo.share", ".share__toggle");
    $(document).off("click.promo.share", "[data-share]");
    
    $(document).on(isMobile() ? "touchstart.promo.share" : "click.promo.share", (e) => {
        if(/(svg)/i.test(e.target.tagName) && e.target.className.baseVal === "share__toggle-icon") return;
        if(/(share__button|share__list|share__toggle|share__toggle_off|share__toggle_on|share__toggle-path)/i.test(e.target.className)) return;
        $(".share__toggle").removeClass("share__toggle--active");
    });
    
    $(document).on("click.promo.share", ".share__toggle", function (e){
        e.preventDefault();
        if(!$(this).hasClass("share__toggle--active")){
            $(".share__toggle").removeClass("share__toggle--active");
        }
        
        $(this).toggleClass("share__toggle--active");
        
        resetPosition($(this).closest(".share"));
    });
    
    $(document).on("click.promo.share", "[data-share]", function (e){
        e.preventDefault();
        
        let shareType = trim($(this).attr("data-share"));
        let shareUrl = $(this).attr("data-share-url");
        
        switch (shareType) {
            case "facebook":
                facebook(shareUrl);
                break;
            case "twitter":
                twitter(shareUrl);
                break;
            
            case "kakaostory":
                kakaostory(shareUrl);
                break;
            
            case "kakaotalk":
                kakaotalk();
                break;
            
            case "googleplus":
                googleplus(shareUrl);
                break;
            
            case "line":
                line(shareUrl);
                break;
            
            case "url":
                copyurl(shareUrl);
                break;
        }
        
        trace(`/${gamename().ko}/이벤트프로모션/${pageTitle}/${shareType}`);
    });
};

export default {
    facebook,
    twitter,
    kakaostory,
    kakaotalk,
    googleplus,
    line,
    copyurl,
    init
};

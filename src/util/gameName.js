/**
 * get game name
 * @param url
 * @returns {*}
 */
const getGameName = (url = location.href) =>{
    let gameName = '';

    if(/aion\.plaync\.com/.test(url)) {
        gameName = {
            'en': 'aion',
            'ko': '아이온'
        };
    }

    if(/lineage\.plaync\.com/.test(url)) {
        gameName = {
            'en': 'lineage',
            'ko': '리니지'
        };
    }

    if(/lineage2\.plaync\.com/.test(url)) {
        gameName = {
            'en': 'lineage2',
            'ko': '리니지2'
        };
    }

    if(/lineage2\.plaync\.com\/classic/.test(url) || /lineage2\.plaync\.com\/promo\/lineage2classic/.test(url)) {
        gameName = {
            'en': 'lineage2classic',
            'ko': '리니지2클래식'
        };
    }

    if(/bns\.plaync\.com/.test(url)) {
        gameName = {
            'en': 'bns',
            'ko': '블소'
        };
    }

    return gameName;
};

export default getGameName;
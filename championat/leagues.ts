import {getHTML} from '../lib/query';
import {getAttr, getNodeList, getWithRegexpOrNull} from '../lib/dom-helper';
export async function getLeagues() {
    const doc = await getHTML('https://www.championat.com/');
    const links = getNodeList(doc, 'a.header-menu__section.menu__i.football');
    const leagues = [];
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const url = getAttr(link, 'href');
        const id = getWithRegexpOrNull(url, /^\/football\/_([^\/]+)\.html$/);
        if (id && id !== 'russia' && id !== 'wfootball' && id !== 'llc') {
            leagues.push({id, url: 'https://www.championat.com' + url});
        }
    }
    return leagues;
}
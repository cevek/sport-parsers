import {getHTML} from '../lib/query';
import {getAttr, getNodeList} from '../lib/dom-helper';
export async function getLeaguesLinks() {
    const doc = await getHTML('https://www.championat.com/');
    return getNodeList(doc, 'a.header-menu__section.menu__i.football')
        .filter(node => getAttr(node, 'href').match(/^\/football\/_/))
        .map(node => 'https://www.championat.com' + getAttr(node, 'href'));
}
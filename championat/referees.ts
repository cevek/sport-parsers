import {getHTML} from '../lib/query';
import {
    getAttr, getAttrOrNull, getNode, getNodeList, getNodeOrNull, getText, getTextOrNull,
    getWithRegexp
} from '../lib/dom-helper';

export interface Referee {
    id: string,
    name: string,
    image: Maybe<string>,
    country: string,
    birthday: Maybe<string>,
    matches: string,
    yellowCards: Maybe<string>,
    secYellowCards: Maybe<string>,
    redCards: Maybe<string>,
    penalties: Maybe<string>
}

export async function getReferees(url: string):Promise<Referee[]> {
    const doc = await getHTML(url);
    const trs = getNodeList(doc, 'table.b-table-sortlist tbody tr');
    return trs.map(tr => {
        const image = getAttrOrNull(getNodeOrNull(tr, 'td:nth-child(2) img'), 'src');
        const nameNode = getNode(tr, 'td:nth-child(3) a');
        const name = getText(nameNode);
        const id = getWithRegexp(getAttr(nameNode, 'href'), /(\d+)\.html$/);
        const country = getText(tr, 'td:nth-child(4)');
        const birthday = getAttrOrNull(getNode(tr, 'td:nth-child(5)'), 'sortOrder');
        const matches = getText(tr, 'td:nth-child(6)');
        const yellowCards = getTextOrNull(tr, 'td:nth-child(7)');
        const secYellowCards = getTextOrNull(tr, 'td:nth-child(8)');
        const redCards = getTextOrNull(tr, 'td:nth-child(9)');
        const penalties = getTextOrNull(tr, 'td:nth-child(10)');
        return {
            image,
            name,
            id,
            country,
            birthday,
            matches,
            yellowCards,
            secYellowCards,
            redCards,
            penalties
        };
    });
}
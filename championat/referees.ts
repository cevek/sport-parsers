import {getHTML} from '../lib/query';
import {
    getAttr,
    getAttrOrNull,
    getNode,
    getNodeListOrNull,
    getNum,
    getNumOrNull,
    getText,
    getWithRegexp
} from '../lib/dom-helper';

export interface Referee {
    id: string,
    name: string,
    image: Maybe<string>,
    country: string,
    birthday: Maybe<string>,
    matches: number,
    yellowCards: Maybe<number>,
    secYellowCards: Maybe<number>,
    redCards: Maybe<number>,
    penalties: Maybe<number>
}

export async function getReferees(url: string): Promise<Referee[]> {
    const doc = await getHTML(url);
    const trs = getNodeListOrNull(doc, 'table.b-table-sortlist tbody tr');
    if (!trs) return [];
    return trs.map(tr => {
        let image: Maybe<string> = getAttr(getNode(tr, 'td:nth-child(2) img'), 'src');
        image = image.match(/no_picture/) ? null : image;
        const nameNode = getNode(tr, 'td:nth-child(3) a');
        const name = getText(nameNode).replace(/\s+/, ' ');
        const id = getWithRegexp(getAttr(nameNode, 'href'), /(\d+)\.html$/);
        const country = getText(tr, 'td:nth-child(4)');
        const birthday = getAttrOrNull(getNode(tr, 'td:nth-child(5)'), 'sortOrder');
        const matches = getNum(tr, 'td:nth-child(6)');
        const yellowCards = getNumOrNull(tr, 'td:nth-child(7)');
        const secYellowCards = getNumOrNull(tr, 'td:nth-child(8)');
        const redCards = getNumOrNull(tr, 'td:nth-child(9)');
        const penalties = getNumOrNull(tr, 'td:nth-child(10)');
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
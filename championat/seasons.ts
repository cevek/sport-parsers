import {getHTML} from '../lib/query';
import {getAttr, getNodeList, validateValue} from '../lib/dom-helper';
export async function getSeasonReferrersLinks(leagueUrl: string) {
    const doc = await getHTML(leagueUrl);
    const seasonSelects = getNodeList(doc, 'select._js_sport-head_select_year');
    const tournamentSelects = getNodeList(doc, 'select._js_sport-head_select');
    const seasonMap = new Map<string, {url: string; id: string}[]>();
    for (let i = 0; i < seasonSelects.length; i++) {
        const select = seasonSelects[i];
        const options = getNodeList(select, 'option[value]');
        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            seasonMap.set(getAttr(option, 'value'), []);
        }
    }
    for (let i = 0; i < tournamentSelects.length; i++) {
        const select = tournamentSelects[i];
        const options = getNodeList(select, 'option[value]');
        const tournaments = validateValue(seasonMap.get(getAttr(select, 'data-year')), `Season not found`);
        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            tournaments.push({url: 'https://www.championat.com' + getAttr(option, 'value').replace(/\/table\/.*$/, '/referees.html'), id: getAttr(option, 'data-id')});
        }
    }
    return seasonMap;
}
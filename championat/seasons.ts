import {getHTML} from '../lib/query';
import {getAttr, getNodeList, getText, validateValue} from '../lib/dom-helper';
export interface SeasonResult {
    name: string;
    tournaments: TournamentResult[];
}
export interface TournamentResult {
    id: string;
    name: string;
    url: string;
}
export async function getSeasonRefereeLinks(leagueUrl: string): Promise<SeasonResult[]> {
    const doc = await getHTML(leagueUrl);
    const seasonSelects = getNodeList(doc, 'select._js_sport-head_select_year');
    const tournamentSelects = getNodeList(doc, 'select._js_sport-head_select');
    const seasonMap = new Map<string, TournamentResult[]>();
    const seasons: SeasonResult[] = [];
    for (let i = 0; i < seasonSelects.length; i++) {
        const select = seasonSelects[i];
        const options = getNodeList(select, 'option[value]');
        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            const tournaments: TournamentResult[] = [];
            const season = getAttr(option, 'value');
            seasons.push({name: season, tournaments});
            seasonMap.set(season, tournaments);
        }
    }
    for (let i = 0; i < tournamentSelects.length; i++) {
        const select = tournamentSelects[i];
        const options = getNodeList(select, 'option[value]');
        const tournaments = validateValue(seasonMap.get(getAttr(select, 'data-year')), `Season not found`);
        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            tournaments.push({
                url: 'https://www.championat.com' + getAttr(option, 'value').replace(/\/table\/.*$/, '/referees.html'),
                id: getAttr(option, 'data-id'),
                name: getText(option)
            });
        }
    }
    return seasons;
}
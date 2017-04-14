import {getLeagues} from './leagues';
import {getSeasonRefereeLinks, SeasonResult, TournamentResult} from './seasons';
import {getReferees, Referee} from './referees';
import {writeFileSync} from 'fs';

interface League {
    id: string;
    url: string;
    seasons: Season[];
}

interface Season extends SeasonResult {
    tournaments: Tournament[];
}

interface Tournament extends TournamentResult {
    referees: Referee[];
}

async function main() {
    const leagues = await getLeagues();
    for (let i = 0; i < leagues.length; i++) {
        const league = leagues[i] as League;
        try {
            const seasons = await getSeasonRefereeLinks(league.url) as Season[];
            league.seasons = seasons;
            for (let j = 0; j < seasons.length; j++) {
                const season = seasons[j];
                for (let j = 0; j < season.tournaments.length; j++) {
                    try {
                        const tournament = season.tournaments[j];
                        tournament.referees = await getReferees(tournament.url);
                    } catch (e) {
                        console.error(e.stack);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
        }
    }
    const resultFile = __dirname + '/../data/championatcom.json';
    writeFileSync(resultFile, JSON.stringify(leagues));
    console.log('Done', resultFile);
}
main().catch(e => console.error(e instanceof Error ? e.stack : e));
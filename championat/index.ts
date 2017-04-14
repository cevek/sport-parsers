import {getLeaguesLinks} from './leagues';
import {getSeasonRefereeLinks, TournamentResult} from './seasons';
import {getReferees, Referee} from './referees';

interface Tournament extends TournamentResult {
    referees: Referee[];
}

async function main() {
    const leaguesLinks = await getLeaguesLinks();
    for (let i = 0; i < leaguesLinks.length; i++) {
        const link = leaguesLinks[i];
        const seasons = await getSeasonRefereeLinks(link);
        for (let j = 0; j < seasons.length; j++) {
            const season = seasons[j];
            for (let j = 0; j < season.tournaments.length; j++) {
                const tournament = season.tournaments[j] as Tournament;
                tournament.referees = await getReferees(tournament.url);
                // console.log(tournament);
                // return;
            }
        }
        // return;
    }

}
main().catch(e => console.error(e instanceof Error ? e.stack : e));
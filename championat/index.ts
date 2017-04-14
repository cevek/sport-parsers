import {getLeaguesLinks} from './leagues';
import {getSeasonReferrersLinks} from './seasons';
async function main() {
    const leaguesLinks = await getLeaguesLinks();
    for (let i = 0; i < leaguesLinks.length; i++) {
        const link = leaguesLinks[i];
        const res = await getSeasonReferrersLinks(link);
        console.log(res);
        return;
    }

}
main().catch(e => console.error(e instanceof Error ? e.stack : e));
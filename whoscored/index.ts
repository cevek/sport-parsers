import {writeFileSync} from 'fs';
import {getRegions} from './regions';

async function main() {
    const regions = await getRegions();

    const resultFile = __dirname + '/../data/whoscoredcom.json';
    // writeFileSync(resultFile, JSON.stringify(regions));
    // console.log('Done', resultFile);
}
main().catch(e => console.error(e instanceof Error ? e.stack : e));
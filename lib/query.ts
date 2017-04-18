import {CoreOptions, get as requestGet, RequestResponse} from 'request';
import {parseDocument} from './jsdom';
import {readFileSync, writeFileSync} from 'fs';
export async function get(url: string, options?: CoreOptions, skipCache?: boolean) {
    return new Promise<string>((resolve, reject) => {
        const cacheUrl = __dirname + '/../cache/' + url.replace(/[^a-z0-9\.]/gi, '_').replace(/^https?___(www\.)?/, '') + '.dat';
        if (!skipCache) {
            try {
                resolve(readFileSync(cacheUrl, 'utf8'));
                console.log('[cache] ' + url);
                return;
            } catch (e) {}
        }
        console.log('[get] ' + url);
        requestGet(url, options, (error: Error, response: RequestResponse, body: string) => {
            if (error) return reject(error);
            const statusCode = response.statusCode!;
            if (statusCode >= 200 && statusCode < 300) {
                try {
                    writeFileSync(cacheUrl, body);
                } catch(e){
                    return reject(e);
                }
                resolve(body.toString());
            } else {
                reject({httpStatusCode: statusCode, body});
            }
        });
    });
}

export async function getHTML(url: string, options?: CoreOptions, skipCache?: boolean) {
    return await parseDocument(await get(url, options, skipCache));
}
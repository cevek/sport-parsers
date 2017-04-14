import {get as requestGet, CoreOptions, RequiredUriUrl, RequestResponse} from 'request';
import {parseDocument} from './jsdom';
import {readFileSync, writeFileSync} from 'fs';
export async function get(url: string, options?: CoreOptions & RequiredUriUrl) {
    return new Promise<string>((resolve, reject) => {
        console.log(url);
        const cacheUrl = __dirname + '/../cache/' + url.replace(/[^a-z0-9\.]/gi, '_').replace(/^https?___(www\.)?/, '') + '.dat';
        try {
            resolve(readFileSync(cacheUrl, 'utf8'));
        } catch(e){}
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

export async function getHTML(url: string, options?: CoreOptions & RequiredUriUrl) {
    return await parseDocument(await get(url, options));
}
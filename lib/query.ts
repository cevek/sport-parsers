import {get as requestGet, CoreOptions, RequiredUriUrl, RequestResponse} from 'request';
import {parseDocument} from './jsdom';
export async function get(url: string, options?: CoreOptions & RequiredUriUrl) {
    return new Promise<string>((resolve, reject) => {
        requestGet(url, options, (error: Error, response: RequestResponse, body: string) => {
            if (error) return reject(error);
            resolve(body.toString());
        });
    });
}

export async function getHTML(url: string, options?: CoreOptions & RequiredUriUrl) {
    return await parseDocument(await get(url, options));
}
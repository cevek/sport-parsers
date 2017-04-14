import {env} from 'jsdom';
export async function parseDocument(html: string) {
    return new Promise<Document>((resolve, reject) => {
        env(html, (err, window) => {
            if (err) return reject(err);
            resolve(window.document);
        });
    });
}
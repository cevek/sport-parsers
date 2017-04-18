import {get, getHTML} from '../lib/query';
import {getNodeList, getWithRegexp} from '../lib/dom-helper';
import {jar, cookie} from 'request';
import {env} from 'jsdom';

const j = jar();
// /_Incapsula_Resource?SWHANEDL=1078051322431429506,7603258804587255409,14043123201228824109,56982
async function req(url = 'https://www.whoscored.com/') {
    return await getHTML(url, {
        jar: j,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3047.0 Safari/537.36',
            'accept-encoding': 'gzip, deflate, sdch, br',
            'accept-language': 'en-US,en;q=0.8,ru;q=0.6',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
        }
    }, true);
}

export async function getRegions() {
    // env({
    //     url: 'https://www.whoscored.com/',
    //     headers: {
    //         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3047.0 Safari/537.36',
    //         'accept-encoding': 'gzip, deflate, sdch, br',
    //         'accept-language': 'en-US,en;q=0.8,ru;q=0.6',
    //         'cache-control': 'no-cache',
    //         'pragma': 'no-cache',
    //         'upgrade-insecure-requests': '1',
    //     },
    //     done: (error: any, window: Window) => {
    //         console.log('done', window.document.documentElement.innerHTML);
    //     }
    // } as any, (err, window) => {
    //     console.log(window.document.documentElement.innerHTML);
    // });
    // console.log(j.getCookieString('https://www.whoscored.com/'));
    const value = '___utmvc=navigator%3Dtrue,navigator.vendor%3DGoogle%20Inc.,navigator.appName%3DNetscape,navigator.plugins.length%3D%3D0%3Dfalse,navigator.platform%3DMacIntel,navigator.webdriver%3Dundefined,plugin_ext%3Dplugin,plugin_ext%3Dno%20extention,ActiveXObject%3Dfalse,webkitURL%3Dtrue,_phantom%3Dfalse,callPhantom%3Dfalse,chrome%3Dtrue,yandex%3Dfalse,opera%3Dfalse,opr%3Dfalse,safari%3Dfalse,awesomium%3Dfalse,puffinDevice%3Dfalse,__nightmare%3Dfalse,_Selenium_IDE_Recorder%3Dfalse,document.__webdriver_script_fn%3Dfalse,document.%24cdc_asdjflasutopfhvcZLmcfl_%3Dfalse,process.version%3Dfalse,navigator.cpuClass%3Dfalse,navigator.oscpu%3Dfalse,navigator.connection%3Dtrue,window.outerWidth%3D%3D0%3Dfalse,window.outerHeight%3D%3D0%3Dfalse,window.WebGLRenderingContext%3Dtrue,document.documentMode%3Dundefined,eval.toString().length%3D33,digest=; expires=Fri, 14 Apr 2017 16:06:39 GMT; path=/';
    j.setCookie(cookie(value), 'https://www.whoscored.com');

    console.log(j.getCookieString('https://www.whoscored.com'));

    let doc: Maybe<Document> = null;
    try {
        doc = await req();
    } catch (e) {
        if (e.httpStatusCode === 403) {
            // doc = await req();
            // await req('/_Incapsula_Resource?SWHANEDL=1078051322431429506,7603258804587255409,14043123201228824109,56982');
        }
    }
    // doc = await req();
    await req('https://www.whoscored.com/_Incapsula_Resource?SWHANEDL=1078051322431429506,7603258804587255409,14043123201228824109,56982');
    if (!doc) {
        throw new Error('Cannot connect');
    }
    //
    console.log(doc.documentElement.innerHTML);
    // const scripts = getNodeList(doc, 'script');
    // const script = scripts.find(script => !!(script.textContent && script.textContent.match(/^var allRegions /)));
    // console.log(scripts);
    // if (!script) throw new Error('script with json is not found');
    // const json = getWithRegexp(script.textContent, /var allRegions = ([\s\S]+);var favoriteTournaments/);
    // const regions = JSON.parse(json);
    // console.log(regions);
    // return regions;
}
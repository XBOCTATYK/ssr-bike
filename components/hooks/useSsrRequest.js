import ReactDOM from 'react-dom/server';
import md5 from 'js-md5';

let globalData = null;
const requestFuncCollection = new Map();

const results = {};

export function SSRLink(link) {
    globalData = JSON.parse(link);
}

export function useSsrRequest(func) {
    const hash = md5.hex(func.toString());

    if (!requestFuncCollection.has(hash)) {
        requestFuncCollection.set(hash, func);
    }

    results[hash] = null;

    return (globalData && globalData[hash]) || hash;
}

export async function valuesOnServer(string) {
    let currentString = string;

    console.log(requestFuncCollection)

    for (let item of requestFuncCollection) {
        const [key, func] = item;
        let res = await func();

        if (res['$$typeof']) {
            res = ReactDOM.renderToString(res);
        }

        results[key] = res;

        const replaceRegexp = new RegExp(key, 'g')
        currentString = currentString.replace(replaceRegexp, res && res.toString())
    }

    return [ currentString, results ];
}

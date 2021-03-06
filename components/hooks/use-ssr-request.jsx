import React from 'react';
import ReactDOM from 'react-dom/server';
import md5 from 'js-md5';

let globalData = null;
const requestFuncCollection = new Map();

const results = {};

export function SSRLink(link) {
    globalData = link;
}

export function useSsrRequest(func) {
    const hash = md5.hex(func.toString());

    if (!requestFuncCollection.has(hash)) {
        requestFuncCollection.set(hash, func);
    }

    results[hash] = null;

    if (globalData && globalData[hash]) {
        const el = globalData[hash];

        if (el.type && el.props) {
            return <el.type { ...el.props } />;
        }

        return el;
    }

    if (typeof window === 'undefined') {
        return hash;
    }

}

export async function valuesOnServer(string) {
    let currentString = string;

    for (let item of requestFuncCollection) {
        const [key, func] = item;
        let res = await func();
        let stringRes = null;

        if (res['$$typeof']) {
            stringRes = ReactDOM.renderToString(res);
        }

        results[key] = res;

        const replaceRegexp = new RegExp(key, 'g')
        currentString = currentString.replace(replaceRegexp, stringRes && stringRes.toString())
    }

    return [ currentString, results ];
}

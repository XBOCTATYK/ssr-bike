import ReactDOM from 'react-dom/server';

let globalData = null;
const requestFuncCollection = {};

class ssrVar {
    constructor(hash) {
        this.hash = hash;
    }

    setVal(val) {
        this.val = val;
    }

    toString() {
        if (!this.val) {
            return this.hash;
        } else {
            this.val.toString()
        }
    }
}

const results = {};

export function SSRLink(link) {
    globalData = JSON.parse(link);
}

export function useSsrRequest(func) {
    const hash = '//hash//';
    requestFuncCollection[hash] = func;
    const ssrV = new ssrVar(hash);

    results[hash] = ssrV;

    return (globalData && globalData[hash]) || hash;
}

export async function valuesOnServer(string) {
    let currentString = string;
    const keys = Object.keys(requestFuncCollection);

    for (let key of keys) {
        let res = await requestFuncCollection[key]();

        if (res['$$typeof']) {
            res = ReactDOM.renderToString(res);
        }

        results[key].setVal(res);
        currentString = currentString.replace(key, res && res.toString())
    }

    return [ currentString, results ];
}

import React from 'react';
import axios from 'axios';

import ClientApi from '../../client-api/game-list/client-api';
import { useSsrRequest } from '../hooks/use-ssr-request';

const getList = async () => {
    const GameApi = new ClientApi(axios);
    const res = await GameApi.getList();

    return <div className='uuul'>{ JSON.stringify(res.data, null, '  ') }</div>
};

export const GameList = () => {
    const [state, setState] = React.useState('1')
    const [res, setRes] = React.useState(useSsrRequest(getList));

    React.useEffect(() => {
        getList().then( res => setRes(res));
    }, [])

    const boom = useSsrRequest(async () => {
        const GameApi = new ClientApi(axios);
        const res = await GameApi.getList();

        return JSON.stringify(res.data, null, '  ');
    })

    setTimeout(() => setState('2'), 400)

    return (
        <pre>
            { res }
            { boom }
            { state }
        </pre>
    )
};

import React from 'react';
import axios from 'axios';

import ClientApi from '../../client-api/game-list/client-api';
import { useSsrRequest } from '../hooks/use-ssr-request';

export const GameList = () => {
    const [state, setState] = React.useState('1')
    const result = useSsrRequest(async () => {
        const GameApi = new ClientApi(axios);
        const res = await GameApi.getList();

        return <div className='uuul'>{ JSON.stringify(res.data, null, '  ') }</div>
    })

    const boom = React.useMemo(() => useSsrRequest(async () => {
        const GameApi = new ClientApi(axios);
        const res = await GameApi.getList();

        return <div className='uuul'>{ JSON.stringify(res.data, null, '  ') }</div>
    }), [])

    return (
        <pre>
            { result }
            { boom }
            { state }
        </pre>
    )
};

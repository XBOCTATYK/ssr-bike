import React from 'react';
import axios from 'axios';

import ClientApi from '../../client-api/game-list/client-api';
import { useSsrRequest } from '../hooks/useSsrRequest';

export const GameList = () => {
    const result = useSsrRequest(async () => {
        const GameApi = new ClientApi(axios);
        const res = await GameApi.getList();

        return <div className='uuul'>{ JSON.stringify(res.data, null, '  ') }</div>
    })

    return (
        <pre>
            { result }
        </pre>
    )
};

import React from 'react';
import ReactDOM from 'react-dom';

import { GameList } from '../components/game-list/game-list';

export function createApp() {
    ReactDOM.hydrate(<GameList />, document.getElementById('app'))
}


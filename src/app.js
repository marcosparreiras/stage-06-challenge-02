import { FavoritesView } from './view.js';
import { fecthUserGithubData } from './utils.js';

function app() {
    new FavoritesView('app', fecthUserGithubData);
}

app();

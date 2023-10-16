export class FavoritesModel {
    constructor() {
        this.entries = [];
        this.load();
    }

    load() {
        const data = JSON.parse(localStorage.getItem('@gitfavs'));
        if (data) {
            this.entries = data;
        }
    }

    add(newEntrie) {
        const entrieExists = this.entries.find((entrie) => {
            return entrie.login === newEntrie.login;
        });
        if (entrieExists) {
            return false;
        }
        this.entries.push(newEntrie);
        this.upload();
        return true;
    }

    delete(login) {
        this.entries = this.entries.filter((entrie) => entrie.login !== login);
        this.upload();
    }

    upload() {
        localStorage.setItem('@gitfavs', JSON.stringify(this.entries));
    }
}

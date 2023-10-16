import { FavoritesModel } from './model.js';

export class FavoritesView extends FavoritesModel {
    constructor(rootID, fetchMethod) {
        super();
        this.fetchMethod = fetchMethod;
        this.root = document.getElementById(rootID);
        this.searchInput = this.root.querySelector('.search input');
        this.searchButton = this.root.querySelector('.search button');
        this.table = this.root.querySelector('table');
        this.tbody = this.table.querySelector('tbody');
        this.emptyTableElement = this.createEmptyTableTemplate();
        this.update();
        this.startListeningInputs();
    }

    startListeningInputs() {
        this.searchButton.addEventListener('click', async (_event) => {
            const value = this.searchInput.value.trim();
            if (value.length === 0) {
                alert('Digite o nome de um usuário!');
                return;
            }
            const { login, name, public_repos, followers } =
                await this.fetchMethod(value);
            if (!login) {
                alert('Usuário não encontrado');
                return;
            }
            const userData = { login, name, public_repos, followers };
            const wasAdded = this.add(userData);
            if (!wasAdded) {
                alert('Usuário já cadastrado');
                return;
            }
            this.update();
            this.searchInput.value = '';
        });
    }

    clear() {
        this.table.classList.remove('table-empty');
        Array.from(this.tbody.children).forEach((element) => {
            element.remove();
        });
    }

    update() {
        this.clear();
        if (this.entries.length === 0) {
            this.table.classList.add('table-empty');
            this.tbody.append(this.emptyTableElement);
            return;
        }

        this.entries.forEach((user) => {
            const tableRow = this.createRow(user);
            this.tbody.append(tableRow);
        });
    }

    createRow({ login, name, public_repos, followers }) {
        const tr = document.createElement('tr');
        const tdUser = document.createElement('td');
        tdUser.classList.add('user-data');
        const imgUser = document.createElement('img');
        imgUser.src = `https://github.com/${login}.png`;
        imgUser.alt = 'User image';
        const divUser = document.createElement('div');
        const spanUser = document.createElement('span');
        spanUser.textContent = name;
        const linkUser = document.createElement('a');
        linkUser.target = '_blank';
        linkUser.href = `https://github.com/${login}`;
        linkUser.textContent = login;
        divUser.append(spanUser, linkUser);
        tdUser.append(imgUser, divUser);
        const tdRepos = document.createElement('td');
        tdRepos.textContent = public_repos;
        const tdFollowers = document.createElement('td');
        tdFollowers.textContent = followers;
        const tdRemove = document.createElement('td');
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Remove';
        buttonRemove.onclick = () => {
            this.delete(login);
            this.update();
        };
        tdRemove.append(buttonRemove);
        tr.append(tdUser, tdRepos, tdFollowers, tdRemove);
        return tr;
    }

    createEmptyTableTemplate() {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = '4';
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = './assets/Estrela.svg';
        img.alt = 'empty table';
        const span = document.createElement('span');
        span.textContent = 'Nenhum favorito ainda';
        div.append(img, span);
        td.append(div);
        tr.append(td);
        return tr;
    }
}

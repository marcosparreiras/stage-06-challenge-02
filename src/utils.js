export async function fecthUserGithubData(login) {
    const URL = `https://api.github.com/users/${login}`;
    const response = await fetch(URL);
    const userData = await response.json();
    return userData;
}

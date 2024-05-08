import { baseUrl, repositoriesQuantity} from "/src/scripts/variables.js"; 

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    return await response.json();
}

export {getRepositories}

// https://api.github.com/users/brunoGermano/repos?per_page=5
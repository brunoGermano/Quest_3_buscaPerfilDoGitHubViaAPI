import { baseUrl } from "/src/scripts/variables.js";

async function getUserFollowers(userName) {
    const response = await fetch(`${baseUrl}/${userName}/followers`);
    return await response.json();
}

export {getUserFollowers}

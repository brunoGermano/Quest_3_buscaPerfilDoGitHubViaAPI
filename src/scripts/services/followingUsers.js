import { baseUrl } from "/src/scripts/variables.js";

async function getFollowingUsers(userName) {
    const response = await fetch(`${baseUrl}/${userName}/following`);
    return await response.json();
}

export {getFollowingUsers}

import { getUser } from "/src/scripts/services/user.js";
import { getRepositories } from "/src/scripts/services/repositories.js";
import { getUserFollowers } from "/src/scripts/services/followers.js";
import { getFollowingUsers } from "/src/scripts/services/followingUsers.js";
import { getUserEvents } from "/src/scripts/services/userEvents.js";

import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;

    if (validateEmptyInput(userName)) return;/*Só executa a chamada da "getUserData se não entrar neste if " */
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    /* Keyup evento de aperta tecla, a tecla do enter é a tecla 13 no java script */
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13; /* se a key for igual a 13, atribuo na isEnterKeyPressed */
    if (isEnterKeyPressed) {

        if (validateEmptyInput(userName)) return;
        getUserData(userName);
    }

})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        window.alert("Por favor, preencha o campo com o nome do usuário do GitHub!");
        return true;
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName);

    if (userResponse.message === "Not Found") {
        screen.renderUserNotFound();
        return;
    }

    /* Searching for user followers */
    const userfollowers = await getUserFollowers(userName);
    const followingUsers = await getFollowingUsers(userName);

    /* Searching for repositories */
    const repositoriesResponse = await getRepositories(userName);
      
    
    /* Searching for user events */
    const userEvents = await getUserEvents(userName);
    const filteredEvents = filterEvents(userEvents);
    const ultimosEventos = filteredEvents.slice(0, 10);
    user.setUserEvents(ultimosEventos);


    /* chama o objeto "user" para setar as propriedades dele */
    user.setInfo(userResponse);
    /* chama o objeto "user" para setar a propriedade de repositorios dele */
    user.setRepositories(repositoriesResponse);

    /* Set the user followers for the current user */
    user.setCountFollowers(userfollowers.length);

    /* Set the count of followings user for the current user */
    user.setCountFollowings(followingUsers.length);

    screen.renderUser(user);
    screen.renderUserRepositories(user);
    screen.renderUserEvents(user);

}

function filterEvents(array) {
    return array.filter((event) => { return event.type === 'CreateEvent' || event.type === 'PushEvent' });
}



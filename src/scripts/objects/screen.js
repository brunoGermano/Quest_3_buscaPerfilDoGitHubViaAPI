const screen = {

    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
        /* Renderizing the datas user like avatar, name and biography */
        this.userProfile.innerHTML = `<div class="info">
                                           <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                           <div class="data">
                                            <h1> ${user.name ?? 'Não possui nome cadastrado 😢'} </h1>
                                            <p> ${user.bio ?? 'Não possui bio cadastrada 😢'} </p>
                                            <p>👥 Seguidores: ${user.countFollowers ?? 'Não possui Seguidores'} | Seguindo: ${user.countFollowings ?? 'Não segue ninguém'}</p>
                                           </div>
                                      </div>`;
        /* ?? testa para o caso de nulo e coloca a mensagem subsequente. */

    },

    renderUserRepositories(user) {
        /* Renderizing repositories from user*/
        let repositoriesItens = "";

        user.repositories.forEach((repository) => {

            repositoriesItens += `<li>
                             <a href="${repository.html_url}" target="_blank">${repository.name}
                                 <div class="repositoryInfo">
                                     <span title="Forks">🍴 ${repository.forks ?? 'Not Found'}</span>
                                     <span title="Estrelas do Repositório">⭐ ${repository.stargazers_count ?? 'Not Found'}</span>
                                     <span title="Watchers">👀 ${repository.watchers_count ?? 'Not Found'}</span>
                                     <span title="Linguagens de programação usada">👩‍💻 ${repository.language ?? 'Not Found'}</span>
                                 </div>
                             </a>    
                          </li>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`;
        }

    },

    renderUserEvents(user) {
        /* Renderizing user events list */
        let userEvent = "";
        user.userEvents.forEach(event => {

            let message = "Message Not Found";
            if (event.payload && event.payload.commits && event.payload.commits.length > 0) {
                // Acessando o atributo "message" do primeiro commit
                message = event.payload.commits[0].message;
            }

            userEvent += `<li><p class="eventRepository">${event.repo.name} </p> - ${message}</li>`;
        });

        if (user.userEvents.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                    <h2>Eventos</h2>
                    <ul>${userEvent}</ul>
                    </div>`;
        }
    },

    /* If the user is not found */
    renderUserNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }

}

export { screen }
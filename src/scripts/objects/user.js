const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    repositories: [],
    userEvents: [],
    countFollowers: 0,
    countFollowings: 0,

    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url;
        this.name = gitHubUser.name;
        this.bio = gitHubUser.bio;
        this.userName = gitHubUser.login;
    },

    setRepositories(repositories){
        this.repositories = repositories;
    },
    setUserEvents(events){
        this.userEvents = events;
    },

    setCountFollowers(usersQuantity){
        this.countFollowers = usersQuantity;
    },
    setCountFollowings(usersQuantity){
        this.countFollowings = usersQuantity;
    }
}

export {user}
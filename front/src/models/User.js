function createUser(data) {

    return {
        id: data.id,
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        fullname: `${data.name} ${data.lastname}`,
        email: data.email,
        avatar: data.avatar ? data.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
        following: data.following ? data.following : 42,
        followers: data.followers ? data.followers : 43,
        createdData: data.createdAt,
        createPost(content) {
            console.log(`Usuario ${this.fullname} postou o seguinte: ${content}`);

        }

    }
}
export default createUser;
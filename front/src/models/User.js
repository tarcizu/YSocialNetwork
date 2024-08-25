function createUser(data) {

    return {
        id: data.id,
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        fullname: `${data.name} ${data.lastname}`,
        email: data.email,
        avatar: data.avatar ? data.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
        following: data.followingCount,
        followers: data.followerCount,
        createdData: data.createdAt

    }
}
export default createUser;
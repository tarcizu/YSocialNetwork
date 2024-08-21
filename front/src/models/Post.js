function createPost(data, access_token) {

    return {
        id: data.id,
        author: {
            id: data.user.id,
            username: data.user.username,
            fullname: `${data.user.name} ${data.user.lastname}` || 'João da Silva',
            avatar: data.user.avatar ? data.user.avatar : 'https://i.ibb.co/R03Zw8q/Male.png'
        },
        content: data.content,
        image: data.image,
        source: data.source.name,
        createdData: data.createdAt,
        likes: parseInt(data.likeCount) || 10,
        reposts: parseInt(data.repostCount) || 30,
        hasReposted: false,
        hasLiked: false,
        hasSaved: false,
        async like() {
            this.hasLiked = !this.hasLiked;
            console.log("Deu Like");

        }





    }
}
export default createPost;
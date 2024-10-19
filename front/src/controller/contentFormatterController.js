export function contentPostFormatter(originalContent) {
    const hashtagRegex = /#(\p{L}[\p{L}\p{N}]*)/gu;
    const usernameRegex = /@(\w+)/g;

    const hashtagConverted = originalContent.replace(hashtagRegex, `<span class="hashtag" href="#">#$1</span>`);
    const content = hashtagConverted.replace(usernameRegex, `<a class="profileLink" href="/profile/$1">@$1</a>`);

    return content;
}

export function isHashtag(content) {
    const regex = /^#\w+$/;
    return regex.test(content);

}

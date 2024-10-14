export function contentPostFormatter(originalContent) {
    const hashtagRegex = /#(\p{L}[\p{L}\p{N}]*)/gu;
    const usernameRegex = /@(\w+)/g;

    const hashtagConverted = originalContent.replace(hashtagRegex, `<a class="hashtag" href="#">#$1</a>`);
    const content = hashtagConverted.replace(usernameRegex, `<a class="hashtag" href="/profile/$1">@$1</a>`);







    return content;

}

export function contentPostFormatter(originalContent) {
    const hashtagRegex = /#(\w+)/g;

    const content = originalContent.replace(hashtagRegex, `<a class="hashtag" href="#">#$1</a>`);

    return content;

}

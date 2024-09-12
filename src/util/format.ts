export const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const formatProfileLink = (username: string) => {
    return `/profile/${username}`;
};

export const formatArticleLink = (slug: string) => {
    return `/article/${slug}`;
};

export const formatTagLink = (tag: string) => {
    return `/?tag=${tag}`;
};

export const formatFavoritedLink = (favorited: string) => {
    return `?favorited=${favorited}`;
};

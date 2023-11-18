export const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const formatProfileLink = (username: string): string => {
    return `/profile/${username}`;
};

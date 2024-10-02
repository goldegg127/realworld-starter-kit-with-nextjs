export const navigator = {
    profile: (username: string) => `/profile/${username}`,
    articleDetails: (slug: string) => `/article/${slug}`,
    tag: (tag: string) => `?tag=${tag}`,
    favorited: (favorited: string) => `?favorited=${favorited}`,
    signin: `/signin`,
    signup: `/signup`,
    editor: `/editor`,
    settings: `/settings`,
};

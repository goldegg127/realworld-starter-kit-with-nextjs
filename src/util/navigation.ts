export const navigator = {
    profile: (username: string) => `/profile/${username}`,
    articleDetails: (slug: string) => `/article/${slug}`,
    tag: (tag: string) => `?tag=${tag}`,
    favorited: (username: string) => `?favorited=${username}`,
    signin: `/signin`,
    signup: `/signup`,
    editor: `/editor`,
    settings: `/settings`,
    main: '/',
};

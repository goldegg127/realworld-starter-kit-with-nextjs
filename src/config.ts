const BASE_URI = 'https://api.realworld.io/api';

export const END_POINT = {
    ARTICLES: `articles`,
    PROFILES: `profiles`,
    TAGS: `tags`,
    USERS: `users`,
    COMMENTS: `comments`,
    LOGIN: `login`,
};

export const API = {
    ARTICLES: `${BASE_URI}/${END_POINT.ARTICLES}`,
    PROFILES: `${BASE_URI}/${END_POINT.PROFILES}`,
    TAGS: `${BASE_URI}/${END_POINT.TAGS}`,
    USERS: `${BASE_URI}/${END_POINT.USERS}`,
};

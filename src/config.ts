const REALWORLD_BASE_URI = 'https://api.realworld.io/api';
const NEXT_BASE_URI = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const END_POINT = {
    ARTICLES: `articles`,
    PROFILES: `profiles`,
    TAGS: `tags`,
    USERS: `users`,
    COMMENTS: `comments`,
    LOGIN: `login`,
};

export const REALWORLD_API = {
    ARTICLES: `${REALWORLD_BASE_URI}/${END_POINT.ARTICLES}`,
    PROFILES: `${REALWORLD_BASE_URI}/${END_POINT.PROFILES}`,
    TAGS: `${REALWORLD_BASE_URI}/${END_POINT.TAGS}`,
    USERS: `${REALWORLD_BASE_URI}/${END_POINT.USERS}`,
};

export const NEXT_API = {
    ARTICLES: `${NEXT_BASE_URI}/${END_POINT.ARTICLES}`,
    PROFILES: `${NEXT_BASE_URI}/${END_POINT.PROFILES}`,
    TAGS: `${NEXT_BASE_URI}/${END_POINT.TAGS}`,
    USERS: `${NEXT_BASE_URI}/${END_POINT.USERS}`,
};

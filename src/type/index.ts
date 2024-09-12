export type Articles = Article[];

export type Article = {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
};

export type Author = {
    username: string;
    bio: string;
    image: string;
    following: boolean;
};

export type Profile = {
    username: string;
    bio: string;
    image: string;
    following: boolean;
};

export type ArticlesApiParam = {
    offset?: number;
    limit?: number;
    tag?: string;
    author?: string;
    favorited?: string;
};

export type Comments = Comment[];
export type Comment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    };
};

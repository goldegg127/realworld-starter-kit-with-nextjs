import { Comments, Comment, Author } from '@/type';

export type ArticleActionsProps = {
    slug: string;
    profileLink: string;
    image: string;
    username: string;
    date: string;
};

export type ArticleBannerProps = {
    slug: string;
    title: string;
    profileLink: string;
    image: string;
    username: string;
    date: string;
};

export type ArticleContentProps = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

export type CardFooterProps = {
    slug: string;
    commentId: Comment['id'];
    author: Comment['author'];
    createdAt: Comment['createdAt'];
};

export type ProfileLinkProps = {
    username: Author['username'];
    children: React.ReactNode;
};

export type CommentButtonDeleteProps = {
    slug: string;
    commentId: Comment['id'];
    username: Author['username'];
};

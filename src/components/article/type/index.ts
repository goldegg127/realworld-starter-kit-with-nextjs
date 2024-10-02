import { Comments, Comment, Author } from '@/type';

export type CardFooterProps = {
    slug: string;
    commentId: Comment['id'];
    author: Comment['author'];
    createdAt: Comment['createdAt'];
};

export type ProfileLinkProps = {
    username: string;
    children: React.ReactNode;
};

export type CommentButtonDeleteProps = {
    slug: string;
    commentId: Comment['id'];
    username: Author['username'];
};

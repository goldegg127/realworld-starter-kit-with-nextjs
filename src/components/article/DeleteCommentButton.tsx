'use client';

import { deleteComment } from '@/api';
import useAuthStore from '@/store/authStore';

export default async function DeleteCommentButton({
    slug,
    commentId,
    username: authorName,
}: {
    slug: string;
    commentId: number;
    username: string;
}) {
    const { token, userInfo } = useAuthStore();

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment({ slug, commentId, token });
        } catch (error) {
            console.error(`Error : ${error}`);
        }
    };

    return authorName === userInfo?.username ? (
        <button type="button" className="mod-options" onClick={() => handleDeleteComment(commentId)}>
            <i className="ion-trash-a" aria-label="delete comment"></i>
        </button>
    ) : (
        <></>
    );
}

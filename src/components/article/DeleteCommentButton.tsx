'use client';

import { deleteComment } from '@/api';
import useAuthStore from '@/store/authStore';

export default async function DeleteCommentButton({ slug, commentId }: { slug: string; commentId: number }) {
    const { token } = useAuthStore();

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment({ slug, commentId, token });
        } catch (error) {
            console.error(`Error : ${error}`);
        }
    };

    return (
        <button type="button" className="mod-options" onClick={() => handleDeleteComment(commentId)}>
            <i className="ion-trash-a" aria-label="delete comment"></i>
        </button>
    );
}

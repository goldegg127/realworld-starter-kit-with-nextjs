'use client';

import { deleteComment } from '@/api';
import { useAuthStore } from '@/stores/authStore';

function useHandleDeleteComment(slug: string) {
    const { token, userInfo } = useAuthStore();

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment({ slug, commentId, token });
        } catch (error) {
            console.error(`Error : ${error}`);
        }
    };

    return { userInfo, handleDeleteComment };
}

export { useHandleDeleteComment };

'use client';

import { useAuthStore } from '@/stores/authStore';
import { deleteArticleDetails } from '@/app/api/realworld';

function useHandleDeleteArticle(slug: string) {
    const { token } = useAuthStore();

    const handleDeleteArticle = async () => {
        if (token) {
            try {
                await deleteArticleDetails(slug, token);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('You have lost your account information. Please log in to proceed.');
        }
    };

    return { handleDeleteArticle };
}

export { useHandleDeleteArticle };

'use client';

import { useAuthStore } from '@/stores/authStore';
import { deleteArticleDetails } from '@/api';

export default function DeleteArticleButton({ slug }: { slug: string }) {
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

    return (
        <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
            <i className="ion-trash-a"></i> Delete Article
        </button>
    );
}

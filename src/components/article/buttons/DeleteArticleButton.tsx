'use client';

import { useHandleDeleteArticle } from '../hooks/useHandleDeleteArticle';

export default function DeleteArticleButton({ slug }: { slug: string }) {
    const { handleDeleteArticle } = useHandleDeleteArticle(slug);

    return (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
            <i className="ion-trash-a"></i> Delete Article
        </button>
    );
}

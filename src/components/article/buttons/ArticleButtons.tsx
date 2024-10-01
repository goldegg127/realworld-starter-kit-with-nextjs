'use client';

import { useHandleDeleteArticle } from '../hooks/useHandleDeleteArticle';
import ArticleButtonDelete from './ArticleButtonDelete';
import ArticleButtonEdit from './ArticleButtonEdit';

export default function ArticleButtons({ slug }: { slug: string }) {
    const { handleDeleteArticle } = useHandleDeleteArticle(slug);

    return (
        <div className="buttons">
            <ArticleButtonEdit slug={slug} />
            <ArticleButtonDelete onClick={handleDeleteArticle} />
        </div>
    );
}

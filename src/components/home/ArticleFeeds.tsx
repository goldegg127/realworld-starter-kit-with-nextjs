'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Articles } from '@/type/index';
import { fetchArticles } from '@/api';
import ArticleItems from './ArticleItems';
import Pagination from './Pagination';

export default function ArticleFeeds({ articles, articlesCount }: { articles: Articles; articlesCount: number }) {
    const searchParams = useSearchParams();
    const pageParams: string | null = searchParams.get('page');
    const currentPage = parseInt(pageParams ?? '1', 10);

    const [articlesData, setArticlesData] = useState(articles);
    const [isLoading, setLoading] = useState(false);

    const fetchPageArticle = useCallback(async () => {
        try {
            const data = await fetchArticles({
                offset: (currentPage - 1) * 10,
                limit: 10,
            });
            return data;
        } catch (error) {
            console.error('fetchPageArticle catch error', error);
        }
    }, [currentPage]);

    useEffect(() => {
        if (!pageParams) {
            return;
        }

        setLoading(true);

        fetchPageArticle()
            .then(({ articles }) => {
                setArticlesData(() => articles);
            })
            .catch(() => {
                setArticlesData(() => []);
                alert('데이터 로드에 실패했습니다. 다시 시도하여 주십시오.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fetchPageArticle, pageParams]);

    if (isLoading) return <p>Loading...</p>;
    if (articlesData.length === 0) return <p>No data</p>;

    return (
        <>
            <ArticleItems articles={articlesData} />
            <Pagination currentPage={currentPage} articlesCount={articlesCount} />
        </>
    );
}

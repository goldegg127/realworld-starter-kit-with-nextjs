'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Articles } from '@/type/index';
import API from '@/config';
import ArticleItems from './ArticleItems';
import Pagination from './Pagination';

export default function ArticleFeeds({ articles, articlesCount }: { articles: Articles; articlesCount: number }) {
    const searchParams = useSearchParams();
    const pageParams: string | null = searchParams.get('page');
    const currentPage = parseInt(pageParams ?? '1', 10);

    const [articlesData, setArticlesData] = useState(articles);
    const [isLoading, setLoading] = useState(false);

    const fetchPageArticle = useCallback(async () => {
        const res = await fetch(`${API.ARTICLES}?offset=${(currentPage - 1) * 10}&limit=10`);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        return data;
    }, [currentPage]);

    useEffect(() => {
        if (!pageParams) {
            return;
        }

        setLoading(true);

        fetchPageArticle().then(({ articles }) => {
            setArticlesData(() => articles);
            setLoading(false);
        });
    }, [fetchPageArticle, pageParams]);

    if (isLoading) return <p>Loading...</p>;
    if (!articlesData) return <p>No data</p>;

    return (
        <>
            <ArticleItems articles={articlesData} />
            <Pagination currentPage={currentPage} articlesCount={articlesCount} />
        </>
    );
}

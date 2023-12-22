import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Articles } from '@/type/index';
import { fetchArticles } from '@/api';
import ArticleItems from './ArticleItems';

export default async function ArticleFeeds() {
    const data = await fetchArticles({});
    const {
        articles,
        articlesCount,
    }: {
        articles: Articles;
        articlesCount: number;
    } = data;

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Suspense fallback={<h2>🌀 Loading...</h2>}>
                <ArticleItems articles={articles} articlesCount={articlesCount} />
            </Suspense>
        </ErrorBoundary>
    );
}

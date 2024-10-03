import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ArticleTabListProps } from './type';
import Loading from '@/app/loading';
import { ArticleList, TabNav } from '@/components/common';

export default function ArticleTabList({
    children,
    navStyle,
    articles,
    articlesCount,
    currentPage,
    searchParams,
}: ArticleTabListProps) {
    return (
        <>
            <TabNav navStyle={navStyle}>{children}</TabNav>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
                <Suspense fallback={<Loading />}>
                    <ArticleList
                        articles={articles}
                        articlesCount={articlesCount}
                        currentPage={currentPage}
                        searchParams={searchParams}
                    />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

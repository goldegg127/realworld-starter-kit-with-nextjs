import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchArticles } from '@/api';
import { Articles, Article } from '@/type';
import ArticleItems from '@/components/home/ArticleItems';
import Loading from '@/app/loading';

export default async function ArticleList({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    const currentPage = parseInt(searchParams?.page ?? '1', 10);
    const tag = searchParams?.tag ?? '';

    const data = await fetchArticles({
        offset: (currentPage - 1) * 10,
        tag: tag,
    });

    const {
        articles,
        articlesCount,
    }: {
        articles: Articles;
        articlesCount: number;
    } = data;

    return (
        <>
            <nav className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                        <Link className="nav-link active" href="">
                            My Articles
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="">
                            Favorited Articles
                        </Link>
                    </li>
                </ul>
            </nav>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
                <Suspense fallback={<Loading />}>
                    <ArticleItems
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

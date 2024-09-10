import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/api/supabase';
import { Articles } from '@/type';
import Loading from '@/app/loading';
import ArticleItems from '@/components/common/ArticleItems';

export default async function UserArticleList({
    author,
    searchParams,
}: {
    author: string;
    searchParams?: { [key: string]: string | undefined };
}) {
    const currentPage = parseInt(searchParams?.page ?? '1', 10);

    await syncArticlesWithSupabase({ offset: (currentPage - 1) * 10, author });

    const data = await fetchArticlesFromSupabase({
        offset: (currentPage - 1) * 10,
        author: author,
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

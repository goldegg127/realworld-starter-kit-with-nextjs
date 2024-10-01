import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/api/supabase';
import { Articles, ArticlesApiParam } from '@/type';
import { navigator } from '@/util/navigation';
import Loading from '@/app/loading';
import { ArticleItems } from '@/components/common';

export default async function UserArticleList({
    author,
    searchParams,
}: {
    author: string;
    searchParams?: { [key: string]: string | undefined };
}) {
    const currentPage = parseInt(searchParams?.page ?? '1', 10);
    const favorited = searchParams?.favorited ?? '';

    const param: ArticlesApiParam = {
        offset: (currentPage - 1) * 10,
        author,
        favorited: favorited,
    };

    await syncArticlesWithSupabase(param);

    const {
        articles,
        articlesCount,
    }: {
        articles: Articles;
        articlesCount: number;
    } = await fetchArticlesFromSupabase(param);

    return (
        <>
            <nav className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                        <Link className={`nav-link${!favorited ? ' active' : ''}`} href={navigator.profile(author)}>
                            My Articles
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link${favorited ? ' active' : ''}`} href={navigator.favorited(author)}>
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

import { Suspense } from 'react';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/api/supabase';
import { searchParamsType, Articles } from '@/type';
import { navigator } from '@/util/navigation';
import Loading from '@/app/loading';
import { ArticleItems } from '@/components/common';

export default async function MainAriticleList({ searchParams }: { searchParams?: searchParamsType }) {
    const currentPage = parseInt(searchParams?.page ?? '1', 10);
    const tag = searchParams?.tag ?? '';

    // 서버에서 Supabase와 동기화
    await syncArticlesWithSupabase({ offset: (currentPage - 1) * 10, tag });

    const data = await fetchArticlesFromSupabase({
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
            <nav className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {/** 
                      * @todo 로그인 기능 구현 후 적용
                      <li className="nav-item">
                          <Link className="nav-link" href="">Your Feed</Link>
                      </li> 
                    */}
                    <li className="nav-item">
                        <Link className={`nav-link${!tag ? ' active' : ''}`} href={navigator.main}>
                            Global Feed
                        </Link>
                    </li>
                    {!!tag && (
                        <li className="nav-item">
                            <a className="nav-link active">{tag}</a>
                        </li>
                    )}
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

import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchArticles } from '@/api';
import { Articles, Article } from '@/type/index';
import ArticleItems from './ArticleItems';
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
            <nav className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {/** 
                      * @todo 로그인 기능 구현 후 적용
                      <li className="nav-item">
                          <Link className="nav-link" href="">Your Feed</Link>
                      </li> 
                    */}
                    <li className="nav-item">
                        <Link className="nav-link active" href="">
                            Global Feed
                        </Link>
                    </li>
                    {!!tag && (
                        <li className="nav-item">
                            <Link className="nav-link active" href="">
                                {tag}
                            </Link>
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

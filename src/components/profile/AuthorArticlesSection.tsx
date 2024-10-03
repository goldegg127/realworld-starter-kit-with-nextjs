import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/api/supabase';
import { searchParamsType, Articles, ArticlesApiParam } from '@/type';
import { navigator } from '@/util/navigation';
import Loading from '@/app/loading';
import { ArticleList, TabNav, TabMenu } from '@/components/common';

export default async function AuthorArticlesSection({
    author,
    searchParams,
}: {
    author: string;
    searchParams?: searchParamsType;
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
            <TabNav navStyle="articles-toggle">
                <TabMenu isActive={!!author} link={navigator.profile(author)}>
                    My Articles
                </TabMenu>
                <TabMenu isActive={!!favorited} link={navigator.favorited(author)}>
                    Favorited Articles
                </TabMenu>
            </TabNav>
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

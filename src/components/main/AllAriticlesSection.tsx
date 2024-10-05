import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/api/supabase';
import { searchParamsType, Articles } from '@/types';
import { navigator } from '@/utils/navigation';
import { ArticleTabList, TabMenu } from '@/components/common';

export default async function AllAriticlesSection({ searchParams }: { searchParams?: searchParamsType }) {
    const currentPage = parseInt(searchParams?.page ?? '1', 10);
    const tag = searchParams?.tag ?? '';

    // 서버에서 Supabase와 동기화
    // await syncArticlesWithSupabase({ offset: (currentPage - 1) * 10, tag });

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
            <ArticleTabList
                navStyle="feed-toggle"
                articles={articles}
                articlesCount={articlesCount}
                currentPage={currentPage}
                searchParams={searchParams}>
                {/** 
                     * @todo 로그인 기능 구현 후 적용
                    <TabMenu isActive={} link={}>
                        Your Feed
                    </TabMenu>
                */}
                <TabMenu isActive={!tag} link={navigator.main}>
                    Global Feed
                </TabMenu>
                {!!tag && (
                    <TabMenu isActive={true} link={navigator.tag(tag)}>
                        {tag}
                    </TabMenu>
                )}
            </ArticleTabList>
        </>
    );
}

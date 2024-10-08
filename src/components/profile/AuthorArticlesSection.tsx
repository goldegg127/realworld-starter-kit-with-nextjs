import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/app/api/supabase';
import { searchParamsType, Articles, ArticlesApiParam } from '@/types';
import { navigator } from '@/utils/navigation';
import { ArticleTabList, TabMenu } from '@/components/common';

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
        <ArticleTabList
            navStyle="articles-toggle"
            articles={articles}
            articlesCount={articlesCount}
            currentPage={currentPage}
            searchParams={searchParams}>
            <TabMenu isActive={!!author && !favorited} link={navigator.profile(author)}>
                My Articles
            </TabMenu>
            <TabMenu isActive={!!favorited} link={navigator.favorited(author)}>
                Favorited Articles
            </TabMenu>
        </ArticleTabList>
    );
}

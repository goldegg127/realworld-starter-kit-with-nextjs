import { supabase } from '@/services/supabaseClient';
import { fetchArticlesFromRealworld } from '@/dataSources/realworld';
import { Article, ArticlesApiParam } from '@/types';

// Supabase에서 articles 데이터를 가져와 페이징 처리 및 tag 또는 author 필터링
async function fetchArticlesFromSupabase({
    offset = 0,
    limit = 10,
    tag = '',
    author = '',
    favorited = '',
}: ArticlesApiParam) {
    let query = supabase
        .from('articles')
        .select('*, author!inner(*)', { count: 'exact' }) // author 테이블과의 관계도 조회
        .range(offset, offset + limit - 1); // 페이지네이션 처리

    if (tag) {
        query = query.contains('tag_list', [tag]); // tag_list로 필터링
    }

    if (author) {
        const decodedUsername = decodeURIComponent(author); // URL 인코딩된 author 값을 디코딩
        query = query.eq('author.username', decodedUsername); // author.username 으로 필터링
    }

    if (favorited) {
        /** @todo **/
        if (process.env.NODE_ENV !== 'production') {
            console.error(`❗️ favorited 관계형 테이블을 조회해서 필터링하는 개발 과정이 필요합니다.`);
        }

        return {
            articles: [],
            articlesCount: 0,
        };
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(`Failed to fetch articles from Supabase: ${error.message}`);
    }

    // Supabase 데이터가 존재하면 최신 여부 확인
    if (data && data.length > 0) {
        const resultData = {
            articles: data.map(article => ({
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tag_list,
                createdAt: article.created_at,
                updatedAt: article.updated_at,
                favorited: article.favorited,
                favoritesCount: article.favorites_count,
                author: article.author,
            })),
            articlesCount: count || 0,
        };

        try {
            const supabaseUpdatedAt = new Date(data[0].updated_at);
            const realWorldUpdatedAt = new Date(await fetchUpdatedAtFromRealWorld());

            if (supabaseUpdatedAt >= realWorldUpdatedAt) {
                return resultData;
            }
        } catch (realWorldError) {
            console.error(`Failed to fetch articles from RealWorld API for check update: ${realWorldError}`);

            return resultData;
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Articles fetched successfully!');
    }

    return null; // 최신 데이터가 아니거나 데이터가 없는 경우
}

async function fetchUpdatedAtFromRealWorld() {
    // RealWorld API에서 기사를 가져옴
    const response = await fetchArticlesFromRealworld({ limit: 10 });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch articles from RealWorld API for update check: 
                ${response.status} ${response.statusText}`,
        );
    }

    const { articles } = await response.json();

    if (articles && articles.length > 0) {
        const latestArticle = articles.sort(
            (a: Article, b: Article) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )[0];
        return latestArticle.updatedAt;
    }

    return null; // 업데이트된 기사가 없으면 null 반환
}

export { fetchArticlesFromSupabase };

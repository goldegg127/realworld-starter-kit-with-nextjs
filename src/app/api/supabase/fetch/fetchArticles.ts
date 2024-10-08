import { supabase } from '@/services/supabaseClient';
import { ArticlesApiParam } from '@/types';

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

    const articles = data?.map(article => ({
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
    }));

    if (process.env.NODE_ENV !== 'production') {
        console.log('Articles fetched successfully!');
    }

    return {
        articles: articles || [],
        articlesCount: count || 0,
    };
}

export { fetchArticlesFromSupabase };

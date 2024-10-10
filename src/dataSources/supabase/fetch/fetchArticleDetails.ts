import { supabase } from '@/services/supabaseClient';
import { fetchArticleDetails } from '@/dataSources/realworld';
import { Author } from '@/types';

async function fetchArticleDetailsFromSupabase(slug: string) {
    const { data: articleData, error } = await supabase
        .from('article_details')
        .select(
            `
            slug, title, description, body, tag_list, created_at, updated_at, favorited, favorites_count,
            author:author(id, username, bio, image, following)
        `,
        )
        .eq('slug', slug)
        .single();

    if (error) {
        throw new Error(`Failed to fetch Article Details: ${error.message}`);
    }

    if (articleData) {
        const resultData = {
            article: {
                slug: articleData.slug,
                title: articleData.title,
                description: articleData.description,
                body: articleData.body,
                tagList: articleData.tag_list,
                createdAt: articleData.created_at,
                updatedAt: articleData.updated_at,
                favorited: articleData.favorited,
                favoritesCount: articleData.favorites_count,
                author: articleData.author as any as Author, // 관계형 데이터는 배열로 타입추론되서 강제적으로 캐스팅
            },
        };

        try {
            const supabaseUpdatedAt = new Date(articleData.updated_at);
            const realWorldUpdatedAt = new Date(await fetchUpdatedAtFromRealWorld(slug));

            if (supabaseUpdatedAt >= realWorldUpdatedAt) {
                return resultData;
            }
        } catch (realWorldError) {
            console.error(`Failed to fetch article details from RealWorld API for check update: ${realWorldError}`);

            return resultData;
        }
    }

    return null;
}

async function fetchUpdatedAtFromRealWorld(slug: string) {
    const { article } = await fetchArticleDetails(slug);

    return article.updatedAt;
}

export { fetchArticleDetailsFromSupabase };

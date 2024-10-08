import { supabase } from '@/services/supabaseClient';
import { Author } from '@/types';

async function fetchCommentsFromSupabase(slug: string) {
    const { data: commentsData, error } = await supabase
        .from('comments')
        .select(
            `
            id, body, created_at, updated_at,
            author:author(id, username, bio, image, following),
            article_slug
        `,
        )
        .eq('article_slug', slug);

    if (error) {
        throw new Error(`Failed to fetch Comments: ${error.message}`);
    }

    if (!commentsData || commentsData.length === 0) {
        return { comments: [] };
    }

    const comments = commentsData?.map(comment => ({
        id: comment.id,
        body: comment.body,
        createdAt: comment.created_at,
        updatedAt: comment.updated_at,
        author: comment.author as any as Author, // 관계형 데이터는 배열로 타입추론되서 강제적으로 캐스팅
    }));

    return { comments };
}

export { fetchCommentsFromSupabase };

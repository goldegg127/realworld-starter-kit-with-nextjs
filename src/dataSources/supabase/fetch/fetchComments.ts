import { supabase } from '@/services/supabaseClient';
import { fetchCommentsFromRealworld } from '@/dataSources/realworld';
import { Author, Comment } from '@/types';

async function fetchCommentsFromSupabase(slug: string) {
    const { data, error } = await supabase
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

    if (data && data.length > 0) {
        const resultData = {
            comments: data?.map(comment => ({
                id: comment.id,
                body: comment.body,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
                author: comment.author as any as Author, // 관계형 데이터는 배열로 타입추론되서 강제적으로 캐스팅
            })),
        };

        try {
            const supabaseUpdatedAt = new Date(data[0].updated_at);
            const realWorldUpdatedAt = new Date(await fetchUpdatedAtFromRealWorld(slug));

            if (supabaseUpdatedAt >= realWorldUpdatedAt) {
                return resultData;
            }
        } catch (realWorldError) {
            console.error(`⚠️ Failed to fetch comments from RealWorld API for check update: ${realWorldError}`);

            return resultData;
        }
    }

    return null; // 최신 데이터가 아니거나 데이터가 없는 경우
}

async function fetchUpdatedAtFromRealWorld(slug: string) {
    const response = await fetchCommentsFromRealworld(slug);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch comments from RealWorld API for update check: 
                ${response.status} ${response.statusText}`,
        );
    }

    const { comments } = await response.json();

    if (comments && comments.length > 0) {
        const latestComment = comments.sort(
            (a: Comment, b: Comment) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )[0];
        return latestComment.updatedAt;
    }

    return null; // 업데이트된 기사가 없으면 null 반환
}

export { fetchCommentsFromSupabase };

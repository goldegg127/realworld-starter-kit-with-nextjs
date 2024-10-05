import { supabase } from '@/services/supabaseClient';
import { fetchComments } from '@/api';
import { Author } from '@/types';

async function syncCommentsWithSupabase(slug: string) {
    try {
        // 1. Real World API fetch
        const { comments } = await fetchComments(slug);
        console.log('Fetched Comments from API:', comments.length);

        for (const comment of comments) {
            const { body, createdAt, updatedAt, author } = comment;

            // 2. Supabase의 author 테이블에서 데이터 확인
            const { data: existingAuthor, error: authorError } = await supabase
                .from('author')
                .select('id, username')
                .eq('username', author.username)
                .maybeSingle();

            let authorId = existingAuthor ? existingAuthor.id : null;

            // 3. 중복 없을 시 Supabase의 author 테이블 데이터 삽입
            if (!existingAuthor && !authorError) {
                const { data: insertedAuthor, error: authorInsertError } = await supabase
                    .from('author')
                    .insert({
                        username: author.username,
                        bio: author.bio,
                        image: author.image,
                        following: author.following,
                    })
                    .select()
                    .single();

                if (authorInsertError) {
                    console.error('Author insertion failed:', authorInsertError);
                    continue;
                }

                authorId = insertedAuthor.id;
                console.log(`Author ${author.username} inserted successfully.`);
            }

            // 4. comment는 author가 여러번 작성 가능. 중복체크 생략하고 데이터 삽입
            const { error: commentInsertError } = await supabase.from('comments').insert({
                body,
                created_at: createdAt,
                updated_at: updatedAt,
                author_id: authorId,
                article_slug: slug,
            });

            if (commentInsertError) {
                console.error('Comment insertion failed:', commentInsertError);
            } else if (process.env.NODE_ENV !== 'production') {
                console.log(`Comment by ${author.username} inserted successfully.`);
            }

            // 5. Supabase의 comment 테이블에 제대로 삽입되었는지 바로 확인
            const { data: insertedComments, error: fetchError } = await supabase
                .from('comments')
                .select('id, article_slug')
                .eq('article_slug', slug);

            if (fetchError) {
                console.error('Error fetching comments after insert:', fetchError);
            } else if (process.env.NODE_ENV !== 'production') {
                console.log('Comments synchronized successfully! : ', insertedComments.length);
            }
        }
    } catch (error) {
        console.error('Error synchronizing Comments:', error);
    }
}

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

export { syncCommentsWithSupabase, fetchCommentsFromSupabase };

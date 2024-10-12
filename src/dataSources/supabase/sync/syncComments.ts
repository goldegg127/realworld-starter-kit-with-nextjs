import { supabase } from '@/services/supabaseClient';
import { fetchCommentsFromRealworld } from '@/dataSources/realworld';

async function syncCommentsWithSupabase(slug: string) {
    try {
        // 1. Real World API fetch
        const { comments } = await fetchCommentsFromRealworld(slug);
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
            }

            // 4. 중복 확인 후 댓글 삽입
            const { data: existingComment, error: commentError } = await supabase
                .from('comments')
                .select('id')
                .eq('body', body)
                .eq('author_id', authorId)
                .eq('article_slug', slug)
                .maybeSingle();

            if (!existingComment) {
                const { error: commentInsertError } = await supabase.from('comments').insert({
                    body,
                    created_at: createdAt,
                    updated_at: updatedAt,
                    author_id: authorId,
                    article_slug: slug,
                });

                if (commentInsertError) {
                    console.error('Comment insertion failed:', commentInsertError);
                }
            } else if (process.env.NODE_ENV !== 'production') {
                console.log(`Duplicate comment by ${author.username} found, skipping insertion.`);
            }
        }
    } catch (error) {
        console.error('Error synchronizing Comments:', error);
    }
}

export { syncCommentsWithSupabase };

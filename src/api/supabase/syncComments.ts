import { supabase } from '@/services/supabaseClient';
import { fetchComments } from '@/api';

async function syncCommentsWithSupabase(slug: string) {
    try {
        // 1. Real World API fetch
        console.log(`Fetching Article Comments for slug: ${slug}`);

        const { comments } = await fetchComments(slug);
        console.log('Fetched comments from API:', comments);

        for (const comment of comments) {
            const { body, createdAt, updatedAt, author } = comment;

            // 2. Supabase의 author 테이블에서 데이터 확인
            const { data: existingAuthor, error: authorError } = await supabase
                .from('author')
                .select('id, username')
                .eq('username', author.username)
                .maybeSingle();

            let authorId = existingAuthor ? existingAuthor.id : null;

            // 3. 중복 없을 시 Supabase의 author 테이블과 comments 테이블에 데이터 삽입
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
            } else {
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
                console.log('Inserted comments in Supabase:', insertedComments);
            }
        }
    } catch (error) {
        console.error('Error synchronizing Article Comments:', error);
    }
}

async function fetchCommentsFromSupabase(slug: string) {
    const { data: comments, error } = await supabase
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
        throw new Error(`Failed to fetch comments: ${error.message}`);
    }

    return comments;
}

export { syncCommentsWithSupabase, fetchCommentsFromSupabase };

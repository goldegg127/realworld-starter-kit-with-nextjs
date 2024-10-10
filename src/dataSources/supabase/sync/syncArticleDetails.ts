import { supabase } from '@/services/supabaseClient';
import { fetchArticleDetails } from '@/dataSources/realworld';

async function syncArticleDetailsWithSupabase(slug: string) {
    try {
        // 1. Real World API fetch
        const { article } = await fetchArticleDetails(slug);

        const { title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = article;

        // 2. Supabase 테이블에서 article_details와 author 데이터를 병렬로 확인
        const [resArticles, resAuthors] = await Promise.all([
            supabase.from('article_details').select('id, slug').eq('slug', slug),
            supabase.from('author').select('id, username').eq('username', author.username),
        ]);

        const { data: existingArticles, error: articleError } = resArticles;
        const { data: existingAuthors, error: authorError } = resAuthors;

        if (articleError) {
            console.error('Error fetching existing article from Supabase:', articleError);
            return;
        }

        if (authorError) {
            console.error('Error fetching author From syncDetailsWithSupabase:', authorError);
            return;
        }

        if (existingArticles.length > 1) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`Warning: Multiple entries found for the same Article: "${slug}", skipping insertion.`);
            }
            return;
        }

        if (existingArticles.length === 1) {
            if (process.env.NODE_ENV !== 'production') {
                console.log(`Article with slug ${slug} already exists, skipping insertion.`);
            }
            return;
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log(`Article "${slug}" data does not exist in Supabase. Proceeding with insertion...`);
        }

        let authorId;

        // 4. author 데이터가 없을 시 Supabase의 author 테이블 데이터 삽입
        if (existingAuthors && existingAuthors.length > 0) {
            authorId = existingAuthors[0].id; // 첫 번째 저자의 ID 사용

            if (process.env.NODE_ENV !== 'production') {
                console.log(`Author with username ${author.username} already exists.`);
            }
        } else {
            // 저자가 존재하지 않으면 새로운 저자를 삽입
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
                return;
            }

            authorId = insertedAuthor?.id;
        }

        // 5. 중복 없을 시 article_details 테이블에 데이터 삽입
        const { error } = await supabase.from('article_details').insert({
            slug,
            title,
            description,
            body,
            tag_list: tagList,
            created_at: createdAt,
            updated_at: updatedAt,
            favorited,
            favorites_count: favoritesCount,
            author_id: authorId,
        });

        if (error) {
            if (error.code === '23505') {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('Warning: Article data insertion failed due to existing data.');
                }
            } else {
                console.error('Error Article insertion failed:', error);
            }
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            console.log('Article Details insertion successfully!');
        }

        // 6. Supabase 테이블에 제대로 삽입되었는지 바로 확인
        const { data: insertedDetail, error: fetchError } = await supabase
            .from('article_details')
            .select('id, slug')
            .eq('slug', slug)
            .single();

        if (fetchError) {
            console.error('Error fetching Article Details after insert:', fetchError);
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            console.log('Article Details synchronized successfully!! : ', insertedDetail);
        }
    } catch (error) {
        console.error('Error synchronizing Article Details:', error);
    }
}

export { syncArticleDetailsWithSupabase };

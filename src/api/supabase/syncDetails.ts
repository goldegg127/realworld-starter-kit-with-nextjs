import { supabase } from '@/services/supabaseClient';
import { fetchDetails } from '@/api';
import { Article, Author } from '@/type';

async function syncDetailsWithSupabase(slug: string) {
    try {
        // 1. Real World API fetch
        const { article } = await fetchDetails(slug);
        console.log('Fetched article from API:', article);

        const { title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = article;

        // 2. Supabase 테이블에서 데이터 확인
        const { data: existingArticle, error: articleError } = await supabase
            .from('article_details')
            .select('id, slug')
            .eq('slug', slug)
            .maybeSingle();

        if (existingArticle) {
            console.log(`Article with slug ${slug} already exists, skipping insertion.`);
            return;
        }

        if (articleError) {
            console.error('Error fetching existing article from Supabase:', articleError);
            return;
        }

        console.log('No existing article found, proceeding to insert.');

        // 2. Supabase의 author 테이블에서 데이터 확인
        const { data: existingAuthor, error: authorError } = await supabase
            .from('author')
            .select('id, username')
            .eq('username', author.username)
            .maybeSingle(); // maybeSingle 사용하여 중복된 작가 확인

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
                return;
            }

            authorId = insertedAuthor.id;
            console.log(`Author ${author.username} inserted successfully.`);
        }

        // 4. 중복 없을 시 article_details 테이블에 데이터 삽입
        if (!existingArticle) {
            const { error: articleInsertError } = await supabase.from('article_details').insert({
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

            if (articleInsertError) {
                console.error('Article insertion failed:', articleInsertError);
                return;
            } else if (process.env.NODE_ENV !== 'production') {
                console.log(`Article ${slug} inserted successfully.`);
            }
        } else {
            console.log(`Article with slug ${slug} already exists, skipping insertion.`);
        }

        // 5. Supabase 테이블에 제대로 삽입되었는지 바로 확인
        const { data: insertedDetails, error: fetchError } = await supabase.from('article_details').select('*');
        if (fetchError) {
            console.error('Error fetching Article Details after insert:', fetchError);
        } else if (process.env.NODE_ENV !== 'production') {
            console.log('Article Details synchronized successfully! : ', insertedDetails);
        }
    } catch (error) {
        console.error('Error synchronizing Article Details:', error);
    }
}

async function fetchDetailsFromSupabase(slug: string): Promise<{ article: Article }> {
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

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched Article Details data from Supabase:', articleData);
        console.log('Fetched Article Details **author** data from Supabase:', articleData.author);
    }

    return {
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
}

export { syncDetailsWithSupabase, fetchDetailsFromSupabase };

import { supabase } from '@/services/supabaseClient';
import { fetchDetails } from '@/api';
import { Article, Author } from '@/type';

async function syncDetailsWithSupabase(slug: string) {
    try {
        console.log(`Fetching article details for slug: ${slug}`);

        const { article } = await fetchDetails(slug);
        console.log('Fetched article from API:', article);

        const { title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = article;

        // Supabase에서 해당 슬러그로 기존 기사가 있는지 확인
        const { data: existingArticle, error: articleError } = await supabase
            .from('article_details')
            .select('*')
            .eq('slug', slug)
            .maybeSingle(); // maybeSingle 사용하여 중복된 기사 확인

        // 중복된 경우 건너뛰기
        if (existingArticle) {
            console.log(`Article with slug ${slug} already exists, skipping insertion.`);
            return;
        }

        if (articleError) {
            console.error('Error fetching existing article from Supabase:', articleError);
            return;
        }

        console.log('No existing article found, proceeding to insert.');

        // Author가 Supabase에 있는지 확인 후 삽입
        const { data: existingAuthor, error: authorError } = await supabase
            .from('author')
            .select('*')
            .eq('username', author.username)
            .maybeSingle(); // maybeSingle 사용하여 중복된 작가 확인

        let authorId = existingAuthor ? existingAuthor.id : null;

        // Author가 없다면 새로 추가
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

        if (!existingArticle) {
            // article_details 테이블에 데이터 삽입
            console.log('Inserting new article into Supabase...');

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
                author_id: authorId, // 기존 또는 새로 추가된 author ID 사용
            });

            if (articleInsertError) {
                console.error('Article insertion failed:', articleInsertError);
                return;
            } else {
                console.log(`Article ${slug} inserted successfully.`);
            }
        } else {
            console.log(`Article with slug ${slug} already exists, skipping insertion.`);
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log('Articles synchronized successfully!');
        }
    } catch (error) {
        console.error('Error synchronizing article:', error);
    }
}

async function fetchDetailsFromSupabase(slug: string): Promise<{ article: Article }> {
    console.log(`Fetching article from Supabase for slug: ${slug}`);

    const { data: articleData, error } = await supabase
        .from('article_details')
        .select(
            `
            slug, title, description, body, tag_list, created_at, updated_at, favorited, favorites_count,
            author:author(id, username, bio, image, following)
        `,
        )
        .eq('slug', slug)
        .single(); // 단일 article 객체만 가져옴

    if (error) {
        if (error.code === 'PGRST116') {
            // 데이터가 없거나 다중 결과가 반환된 경우
            console.error('No rows or multiple rows found for the slug:', slug);
        }
        throw new Error(`Failed to fetch article: ${error.message}`);
    }

    console.log('Fetched article details data from Supabase:', articleData);

    const {
        slug: slugData,
        title,
        description,
        body,
        tag_list,
        created_at,
        updated_at,
        favorited,
        favorites_count,
        author,
    } = articleData;

    console.log('fetchDetailsFromSupabase 함수 Author data:', author);

    const article: Article = {
        slug: slugData,
        title: title,
        description: description,
        body: body,
        tagList: tag_list,
        createdAt: created_at,
        updatedAt: updated_at,
        favorited: favorited,
        favoritesCount: favorites_count,
        author: author as any as Author, // 관계형 데이터는 배열로 타입추론되서 강제적으로 캐스팅
    };

    return { article };
}

export { syncDetailsWithSupabase, fetchDetailsFromSupabase };

import { supabase } from '@/services/supabaseClient';
import { fetchArticles } from '@/api';

// Supabase와 동기화하는 함수 : RealWorld API에서 데이터를 가져와 Supabase에 저장하고, 이미 존재하는 데이터는 중복 삽입을 방지
async function syncArticlesWithSupabase({
    offset = 0,
    limit = 10,
    tag = '',
}: {
    offset?: number;
    limit?: number;
    tag?: string;
}) {
    try {
        // 1. Real World API fetch
        const { articles, articlesCount } = await fetchArticles({ offset, limit, tag });

        console.log('Fetched articles.length from API:', articles.length);
        console.log('Fetched articlesCount from API:', articlesCount);
        console.log('Parameter offset:', offset);
        console.log('Parameter limit:', limit);
        console.log('Parameter tag:', tag);

        for (const article of articles) {
            const { title, description, body, tagList, createdAt, updatedAt, slug, favorited, favoritesCount, author } =
                article;

            // 2. Supabase 테이블에서 데이터 확인
            const { data: existingArticle, error: articleError } = await supabase
                .from('articles')
                .select('id, slug') // select에서 선택한 컬럼만 eq 값으로 가져올 수 있다
                .eq('slug', slug)
                .maybeSingle();

            if (existingArticle) {
                console.log(`Article with slug ${slug} already exists, skipping insertion.`);
                continue;
            }

            if (articleError) {
                console.error('Error fetching existing article from Supabase:', articleError);
                continue;
            }

            // 3. Supabase의 author 테이블에서 데이터 확인
            const { data: existingAuthors, error: authorError } = await supabase
                .from('author')
                .select('*')
                .eq('username', author.username);

            if (authorError) {
                console.error('Error fetching author:', authorError);
                continue;
            }

            let authorId;

            // 저자가 이미 존재하는 경우 중복 삽입을 방지하기 위해 계속 진행
            if (existingAuthors && existingAuthors.length > 0) {
                authorId = existingAuthors[0].id; // 첫 번째 저자의 ID 사용
                console.log(`Author with username ${author.username} already exists.`);
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
                    continue; // Insert 실패 시 다음 루프로 이동
                }

                authorId = insertedAuthor?.id;
                console.log(`Author ${author.username} inserted successfully.`);
            }

            // 5. 중복 없을 시 articles 테이블에 데이터 삽입
            if (!existingArticle) {
                const { error: articleInsertError } = await supabase.from('articles').insert({
                    slug,
                    title,
                    description,
                    body,
                    tag_list: tagList,
                    created_at: createdAt,
                    updated_at: updatedAt,
                    favorited,
                    favorites_count: favoritesCount,
                    author_id: authorId, // Foreign Key로 연결
                });

                if (articleInsertError) {
                    console.error('Article insertion failed:', articleInsertError);
                    continue;
                } else if (process.env.NODE_ENV !== 'production') {
                    console.log(`Article ${slug} inserted successfully.`);
                }
            } else {
                console.log(`Article with slug ${slug} already exists, skipping insertion.`);
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log('Articles synchronized successfully!');
        }
    } catch (error) {
        console.error('Error synchronizing articles:', error);
    }
}

// Supabase에서 articles 데이터를 가져와 페이징 처리 및 태그 필터링
async function fetchArticlesFromSupabase({
    offset = 0,
    limit = 10,
    tag = '',
}: {
    offset?: number;
    limit?: number;
    tag?: string;
}) {
    let query = supabase
        .from('articles')
        .select('*, author(*)', { count: 'exact' }) // author 테이블과의 관계도 조회
        .range(offset, offset + limit - 1); // 페이지네이션 처리

    if (tag) {
        query = query.contains('tag_list', [tag]); // tag_list에 해당 태그가 있는지 확인
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(`Failed to fetch articles from Supabase: ${error.message}`);
    }

    const articles = data?.map(article => ({
        slug: article.slug,
        title: article.title,
        description: article.description,
        tagList: article.tag_list,
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        favorited: article.favorited,
        favoritesCount: article.favorites_count,
        author: article.author,
    }));

    if (process.env.NODE_ENV !== 'production') {
        console.log('fetchArticlesFromSupabase 함수 Articles count:', count);
    }

    return {
        articles: articles || [],
        articlesCount: count || 0,
    };
}

export { syncArticlesWithSupabase, fetchArticlesFromSupabase };

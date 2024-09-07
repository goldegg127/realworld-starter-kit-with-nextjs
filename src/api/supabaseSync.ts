import { createClient } from '@supabase/supabase-js';
import { fetchArticles } from '@/api';

if (!process.env.SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined');
}

if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not defined');
}

// Supabase 클라이언트 초기화
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Supabase와 동기화하는 함수 : RealWorld API에서 데이터를 가져와 Supabase에 저장하고, 이미 존재하는 데이터는 중복 삽입을 방지
export async function syncArticlesWithSupabase({
    offset = 0,
    limit = 10,
    tag = '',
}: {
    offset?: number;
    limit?: number;
    tag?: string;
}) {
    try {
        const { articles, articlesCount } = await fetchArticles({ offset, limit, tag });

        if (process.env.NODE_ENV !== 'production') {
            console.log('syncArticlesWithSupabase articles.length: ', articles.length);
            console.log('syncArticlesWithSupabase articlesCount: ', articlesCount);
            console.log('syncArticlesWithSupabase offset: ', offset);
            console.log('syncArticlesWithSupabase limit: ', limit);
            console.log('syncArticlesWithSupabase tag: ', tag);
        }

        for (const article of articles) {
            const { title, description, body, tagList, createdAt, updatedAt, slug, favorited, favoritesCount, author } =
                article;

            // Supabase에 중복된 기사 확인
            const { data: existingArticle, error: existingArticleError } = await supabase
                .from('articles')
                .select('id')
                .eq('slug', slug)
                .maybeSingle(); // maybeSingle 사용하여 중복된 기사 확인

            // 중복된 경우 건너뛰기
            if (existingArticle) {
                // console.log(`Article with slug ${slug} already exists, skipping insertion.`);
                continue; // 이미 존재하는 경우 다음 루프로 이동
            }

            if (existingArticleError) {
                console.error('Error fetching existing article:', existingArticleError);
                continue;
            }

            // Author가 Supabase에 있는지 확인 후 삽입
            const { data: existingAuthors, error: authorFetchError } = await supabase
                .from('author')
                .select('*')
                .eq('username', author.username);

            if (authorFetchError) {
                console.error('Error fetching author:', authorFetchError);
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

                if (process.env.NODE_ENV !== 'production') {
                    console.log('Inserted author:', insertedAuthor);
                }
            }

            if (!existingArticle) {
                // 새 기사 Articles 테이블에 데이터 삽입
                const { error: articleInsertError } = await supabase.from('articles').insert({
                    title,
                    description,
                    body,
                    tagList,
                    created_at: createdAt,
                    updated_at: updatedAt,
                    slug,
                    favorited,
                    favoritesCount,
                    author_id: authorId, // Foreign Key로 연결
                });

                if (articleInsertError) {
                    console.error('Article insertion failed:', articleInsertError);
                } else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log('Article inserted successfully slug:');
                    }
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
export async function fetchArticlesFromSupabase({
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
        query = query.contains('tagList', [tag]); // tagList에 해당 태그가 있는지 확인
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(`Failed to fetch articles from Supabase: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('fetchArticlesFromSupabase 함수 Articles count:', count);
    }

    // articles와 articlesCount 반환
    return {
        articles: data || [],
        articlesCount: count || 0,
    };
}

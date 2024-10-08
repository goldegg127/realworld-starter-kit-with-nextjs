import { supabase } from '@/services/supabaseClient';
import { fetchArticlesFromRealworld } from '@/app/api/realworld';
import { ArticlesApiParam } from '@/types';

// Supabase와 동기화하는 함수 : RealWorld API에서 데이터를 가져와 Supabase에 저장하고, 이미 존재하는 데이터는 중복 삽입을 방지
async function syncArticlesWithSupabase({
    offset = 0,
    limit = 10,
    tag = '',
    author = '',
    favorited = '',
}: ArticlesApiParam) {
    try {
        // 1. Real World API fetch
        const { articles } = await fetchArticlesFromRealworld({ offset, limit, tag, author, favorited });

        if (favorited && articles.length === 0) {
            console.log(`Real World Articles API fetch: `, { offset, limit, tag, author, favorited }, articles);
            console.log('No articles found for the favorited user.');
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            /** @todo **/
            console.error(`❗️favorited 관계형 테이블을 생성해서 삽입하는 개발 과정이 필요합니다.`);
        }

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
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`Article with slug ${slug} already exists, skipping insertion.`);
                }
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
                console.error('Error fetching author from syncArticlesWithSupabase:', authorError);
                continue;
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
                    continue; // Insert 실패 시 다음 루프로 이동
                }

                authorId = insertedAuthor?.id;
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
                }
            } else if (process.env.NODE_ENV !== 'production') {
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

export { syncArticlesWithSupabase };

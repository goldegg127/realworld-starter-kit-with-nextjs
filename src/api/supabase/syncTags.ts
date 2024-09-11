import { supabase } from '@/services/supabaseClient';
import { fetchTagList } from '@/api';
import { Article } from '@/type';

async function syncTagListWithSupabase() {
    try {
        // 1. Real World API fetch
        const { tags } = await fetchTagList();

        for (const tag of tags) {
            // 2. Supabase 테이블에서 데이터 확인
            const { data: existingTag, error: tagError } = await supabase.from('tags').select('id, tag').eq('tag', tag);

            if (tagError) {
                console.error(`Error fetching existing Tag "${tag}" from Supabase:`, tagError);
                continue;
            }

            if (existingTag.length > 1) {
                console.warn(`Warning: Multiple entries found for the same Tag: "${tag}", skipping insertion.`);
                continue;
            }

            if (existingTag.length === 1) {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`Tag "${tag}" already exists, skipping insertion.`);
                }
                continue;
            }

            if (process.env.NODE_ENV !== 'production') {
                console.log(`Tag "${tag}" data does not exist in Supabase. Proceeding with insertion...`);
            }

            // 3. 중복 없을 시 Supabase 테이블에 데이터 삽입
            const { error } = await supabase.from('tags').insert({
                tag,
                created_at: new Date(),
            });

            if (error) {
                console.error('Error insert tag: ', error);
                if (error.code === '23505') {
                    console.warn('Warning: Profile data insertion failed due to existing data.');
                } else {
                    console.error(`Error Tag "${tag}" insertion failed:`, error);
                }
                continue;
            } else if (process.env.NODE_ENV !== 'production') {
                console.log(`Tag "${tag}" inserted successfully!`);
            }

            // 4. Supabase 테이블에 제대로 삽입되었는지 바로 확인
            const { data: insertedTag, error: fetchError } = await supabase
                .from('tags')
                .select('id, tag')
                .eq('tag', tag)
                .single();

            if (fetchError) {
                console.error('Error fetching tags after insert:', fetchError);
            } else if (process.env.NODE_ENV !== 'production') {
                console.log('Tags synchronized successfully! :', insertedTag);
            }
        }
    } catch (error) {
        console.error('Error synchronizing Tags:', error);
    }
}

async function fetchTagListFromSupabase(): Promise<{ tags: Article['tagList'] }> {
    const { data: tags, error } = await supabase.from('tags').select('"tag"');
    // 쌍따옴표(대소문자 구분 목적)를 제거한 값 select('tag')을 넣으면 UI 화면에 중복된 tag가 노출된다

    if (error) {
        throw new Error(`Failed to fetch tags: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched tags from Supabase:', tags);
    }

    if (!tags || tags.length === 0) {
        return { tags: [] };
    }

    return { tags: tags.map(tagRow => tagRow.tag) };
}

export { syncTagListWithSupabase, fetchTagListFromSupabase };

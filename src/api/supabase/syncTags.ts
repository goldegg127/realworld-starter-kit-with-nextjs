import { supabase } from '@/services/supabaseClient';
import { fetchTagList } from '@/api';

async function syncTagListWithSupabase() {
    try {
        const { tags } = await fetchTagList();

        for (const tag of tags) {
            const { data: existingTag, error: tagError } = await supabase
                .from('tags')
                .select('id')
                .eq('tag', tag)
                .single();

            if (tagError) {
                console.error('Error fetching tag:', tagError);
                continue;
            }

            if (existingTag) {
                console.log(`Tag ${tag} already exists, skipping insertion.`);
                continue;
            }

            const { error } = await supabase.from('tags').insert({
                tag,
                created_at: new Date(),
            });

            if (error) {
                console.error('Error insert tag: ', error);
            } else {
                console.log(`Tag ${tag} inserted successfully.`);
            }

            // Supabase 테이블에서 태그가 제대로 삽입되었는지 바로 확인
            const { data: insertedTags, error: fetchError } = await supabase.from('tags').select('*');

            if (fetchError) {
                console.error('Error fetching tags after insert:', fetchError);
            }

            if (process.env.NODE_ENV !== 'production') {
                console.log('Inserted tags in Supabase:', insertedTags);
            }
        }
    } catch (error) {
        console.error('Error synchronizing tags:', error);
    }
}

async function fetchTagListFromSupabase() {
    const { data: tags, error } = await supabase.from('tags').select('"tag"');

    if (error) {
        throw new Error(`Failed to fetch tags: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched tags from Supabase:', tags);
    }

    if (!tags || tags.length === 0) {
        console.log('No tags found in Supabase');
        return [];
    }

    return tags.map(tagRow => tagRow.tag);
}

export { syncTagListWithSupabase, fetchTagListFromSupabase };

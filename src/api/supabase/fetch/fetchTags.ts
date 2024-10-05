import { supabase } from '@/services/supabaseClient';
import { Article } from '@/types';

async function fetchTagListFromSupabase(): Promise<{ tags: Article['tagList'] }> {
    const { data: tagsData, error } = await supabase.from('tags').select('tag');

    if (error) {
        throw new Error(`Failed to fetch tags: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched tags from Supabase:', tagsData);
    }

    if (!tagsData || tagsData.length === 0) {
        return { tags: [] };
    }

    const tags: string[] = tagsData.map(tagRow => tagRow.tag);
    const uniqueTags = [...new Set(tags)];

    return { tags: uniqueTags };
}

export { fetchTagListFromSupabase };

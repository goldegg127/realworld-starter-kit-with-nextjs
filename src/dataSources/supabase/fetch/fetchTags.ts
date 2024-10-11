import { supabase } from '@/services/supabaseClient';
import { fetchTagListFromRealworld } from '@/dataSources/realworld';

async function fetchTagListFromSupabase() {
    const { data: tagsData, error } = await supabase.from('tags').select('tag');

    if (error) {
        throw new Error(`Failed to fetch tags from Supabase: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched tags from Supabase:', tagsData);
    }

    if (!tagsData || tagsData.length === 0) {
        return { tags: [] };
    }

    const tags: string[] = tagsData.map(tagRow => tagRow.tag);
    const uniqueTags = [...new Set(tags)];

    if (uniqueTags && uniqueTags.length > 0) {
        const resultData = { tags: uniqueTags };

        try {
            const supabaseTagsLength = uniqueTags.length;
            const realworldTagsLength = await fetchUpdatedAtFromRealWorld();

            if (supabaseTagsLength >= realworldTagsLength) {
                return resultData;
            }
        } catch (realWorldError) {
            console.error(`⚠️ Failed to fetch tagList from RealWorld API for check update: ${realWorldError}`);

            return resultData;
        }
    }

    return null; // 최신 데이터가 아니거나 데이터가 없는 경우
}

async function fetchUpdatedAtFromRealWorld() {
    // RealWorld API에서 기사를 가져옴
    const response = await fetchTagListFromRealworld();

    if (!response.ok) {
        throw new Error(
            `Failed to fetch tagList from RealWorld API for update check: 
                ${response.status} ${response.statusText}`,
        );
    }

    const { tags } = await response.json();

    if (tags && tags.length > 0) {
        return tags.length;
    }

    return null; // 업데이트된 기사가 없으면 null 반환
}

export { fetchTagListFromSupabase };

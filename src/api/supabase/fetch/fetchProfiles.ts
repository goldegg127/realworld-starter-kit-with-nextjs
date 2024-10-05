import { supabase } from '@/services/supabaseClient';
import { Profile } from '@/types';

async function fetchProfilesFromSupabase(userName: string): Promise<{ profile: Profile }> {
    const decodedUser = decodeURIComponent(userName); // URL 인코딩된 username을 디코딩

    const { data: profileData, error } = await supabase
        .from('profile')
        .select('*')
        .eq('username', decodedUser)
        .single();

    if (error) {
        throw new Error(`Failed to fetch Profile: ${error.message}`);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('Fetched Profile data from Supabase:', profileData);
    }

    return {
        profile: {
            username: profileData.username,
            bio: profileData.bio,
            image: profileData.image,
            following: profileData.following,
        },
    };
}

export { fetchProfilesFromSupabase };

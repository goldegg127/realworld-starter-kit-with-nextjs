import { supabase } from '@/services/supabaseClient';
import { fetchProfiles } from '@/api';
import { Profile } from '@/type';

async function syncProfilesWithSupabase(userName: string) {
    try {
        // 1. Real World API fetch

        const decodedUser = decodeURIComponent(userName); // URL 인코딩된 username을 디코딩
        const { profile } = await fetchProfiles(userName);

        if (process.env.NODE_ENV !== 'production') {
            console.log('Fetch Profile from API', profile);
        }

        const { username, bio, image, following } = profile;

        // 2. Supabase 테이블에서 데이터 확인

        const { data: existingProfile, error: profileError } = await supabase
            .from('profile')
            .select('id, username')
            .eq('username', decodedUser)
            .maybeSingle();

        if (existingProfile) {
            console.log(`Profile with username ${decodedUser} already exists, skipping insertion.`);
            return;
        }

        if (profileError) {
            console.error('Error fetching existing username from Supabase:', profileError);
            return;
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log('No existing Profile found, proceeding to insert.');
        }

        // 3. 중복 없을 시 Supabase 테이블에 데이터 삽입

        const { error } = await supabase.from('profile').insert({
            username,
            bio,
            image,
            following,
            created_at: new Date(),
            updated_at: new Date(),
        });

        if (error) {
            console.error('Error insert Profile: ', error);
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            console.log(`Profile ${username} inserted successfully.`);
        }

        // 4. Supabase 테이블에 제대로 삽입되었는지 바로 확인

        const { data: insertProfile, error: fetchError } = await supabase.from('profile').select('*');

        if (fetchError) {
            console.error('Error fetching Profile after insert:', fetchError);
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            console.log('Inserted Profile in Supabase:', insertProfile);
        }
    } catch (error) {
        console.error('Error synchronizing profile:', error);
    }
}

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

export { syncProfilesWithSupabase, fetchProfilesFromSupabase };

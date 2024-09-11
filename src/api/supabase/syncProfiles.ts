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
            .eq('username', decodedUser);

        if (profileError) {
            console.error(`Error fetching existing username "${decodedUser}" from Supabase:`, profileError);
            return;
        }

        if (existingProfile.length > 1) {
            console.warn(
                `Warning: Multiple entries found for the same username: "${decodedUser}", skipping insertion.`,
            );
            return;
        }

        if (existingProfile.length === 1) {
            console.log(`Profile with username "${decodedUser}" already exists, skipping insertion.`);
            return;
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log(
                `Profile username "${decodedUser}" data does not exist in Supabase. Proceeding with insertion...`,
            );
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
            if (error.code === '23505') {
                console.warn('Warning: Profile data insertion failed due to existing data.');
            } else {
                console.error(`Error Profile username "${decodedUser}" insertion failed:`, error);
            }
            return;
        } else if (process.env.NODE_ENV !== 'production') {
            console.log(`Profile username "${decodedUser}" inserted successfully!`);
        }

        // 4. Supabase 테이블에 제대로 삽입되었는지 바로 확인
        const { data: insertedProfile, error: fetchError } = await supabase
            .from('profile')
            .select('id, username')
            .eq('username', decodedUser)
            .single();

        if (fetchError) {
            console.error('Error fetching Profile after insert:', fetchError);
        } else if (process.env.NODE_ENV !== 'production') {
            console.log('Profile synchronized successfully! :', insertedProfile);
        }
    } catch (error) {
        console.error('Error synchronizing Profile:', error);
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

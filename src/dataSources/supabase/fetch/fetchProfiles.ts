import { supabase } from '@/services/supabaseClient';
import { fetchProfilesFromRealworld } from '@/dataSources/realworld';
import { Profile } from '@/types';

async function fetchProfilesFromSupabase(userName: string) {
    const decodedUser = decodeURIComponent(userName); // URL 인코딩된 username을 디코딩

    const { data: profileData, error } = await supabase
        .from('profile')
        .select('*')
        .eq('username', decodedUser)
        .single();

    if (error) {
        throw new Error(`Failed to fetch Profile: ${error.message}`);
    }

    if (profileData) {
        const resultData = {
            profile: {
                username: profileData.username,
                bio: profileData.bio,
                image: profileData.image,
                following: profileData.following,
            },
        };

        try {
            const realworldData = await fetchUpdatedAtFromRealWorld(userName);

            const isSameData = compareProfiles(profileData.profile, realworldData);

            if (isSameData) {
                return resultData;
            }
        } catch (realWorldError) {
            console.error(`⚠️ Failed to fetch profile data from RealWorld API for check update: ${realWorldError}`);

            return resultData;
        }
    }

    return null; // 최신 데이터가 아니거나 데이터가 없는 경우
}

async function fetchUpdatedAtFromRealWorld(userName: string) {
    const { profile } = await fetchProfilesFromRealworld(userName);

    return profile;
}

function compareProfiles(supabaseProfile: Profile, realworldProfile: Profile) {
    for (const key in supabaseProfile) {
        if (Object.prototype.hasOwnProperty.call(supabase, key)) {
            const isSameValue = supabaseProfile[key as keyof Profile] === realworldProfile[key as keyof Profile];

            if (!isSameValue) {
                return false;
            }
        }
    }

    return true;
}

export { fetchProfilesFromSupabase };

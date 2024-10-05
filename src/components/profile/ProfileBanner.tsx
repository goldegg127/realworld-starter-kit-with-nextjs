import Image from 'next/image';
import { syncProfilesWithSupabase, fetchProfilesFromSupabase } from '@/api/supabase';
// import { Button } from "@/components/common";

export default async function ProfileBanner({ author }: { author: string }) {
    // await syncProfilesWithSupabase(author);

    const { profile } = await fetchProfilesFromSupabase(author);
    const { username, bio, image, following } = profile;

    return (
        <>
            <Image src={image} alt={`${username} profile image`} className="user-img" width={32} height={32} />
            <h4>{username}</h4>
            <p>{bio}</p>
            {/**
         * @todo 로그인 기능 구현 후 적용 예정
            <Button type="button" styleClass={{ size: 'sm', outline: true, color: 'secondary', action: true }}>
                <i className="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
            </Button>
            <Button type="button" styleClass={{ size: 'sm', outline: true, color: 'secondary', action: true }}>
                <i className="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
            </Button> 
        */}
        </>
    );
}

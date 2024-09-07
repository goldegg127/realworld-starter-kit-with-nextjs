import Image from 'next/image';
import { syncProfilesWithSupabase, fetchProfilesFromSupabase } from '@/api/supabase';
import { Profile } from '@/type';
import UserBanner from '@/components/profile/UserBanner';
import ArticleList from '@/components/profile/UserArticleList';

export default async function UserProfile({
    params,
    searchParams,
}: {
    params: { author: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ searchParams: ', searchParams);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ params: ', params);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ params.author: ', params.author);

    await syncProfilesWithSupabase(params.author);

    const { profile } = await fetchProfilesFromSupabase(params.author);
    const { username, bio, image, following }: Profile = profile;

    return (
        <main className="profile-page">
            <section className="user-info">
                <div className="container">
                    <div className="row">
                        <section className="col-xs-12 col-md-10 offset-md-1">
                            {/* <UserBanner searchParams={searchParams} /> */}
                        </section>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    <section className="col-xs-12 col-md-10 offset-md-1">
                        <ArticleList searchParams={searchParams} />
                    </section>
                </div>
            </section>
        </main>
    );
}

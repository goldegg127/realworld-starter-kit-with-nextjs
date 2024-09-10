import UserBanner from '@/components/profile/UserBanner';
import UserArticleList from '@/components/profile/UserArticleList';
import { Children } from 'react';

export default function UserProfile({
    params,
    searchParams,
}: {
    params: { author: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    return (
        <main className="profile-page">
            <div className="user-info">
                <LayoutContiner>
                    <UserBanner author={params.author} />
                </LayoutContiner>
            </div>
            <LayoutContiner>
                <UserArticleList author={params.author} searchParams={searchParams} />
            </LayoutContiner>
        </main>
    );
}

type LayoutContinerProps = {
    children: React.ReactNode;
};

function LayoutContiner({ children }: LayoutContinerProps) {
    return (
        <section className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
            </div>
        </section>
    );
}

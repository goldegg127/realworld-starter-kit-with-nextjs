import { UserBanner, UserArticleList } from '@/components/profile';

export default function UserProfilePage({
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

function LayoutContiner({ children }: { children: React.ReactNode }) {
    return (
        <section className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
            </div>
        </section>
    );
}

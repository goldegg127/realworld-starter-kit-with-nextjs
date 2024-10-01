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
                <Container>
                    <UserBanner author={params.author} />
                </Container>
            </div>
            <Container>
                <UserArticleList author={params.author} searchParams={searchParams} />
            </Container>
        </main>
    );
}

function Container({ children }: { children: React.ReactNode }) {
    return (
        <section className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
            </div>
        </section>
    );
}

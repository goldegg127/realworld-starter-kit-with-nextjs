import { searchParamsType } from '@/types';
import { ProfileBanner, AuthorArticlesSection } from '@/components/profile';

export default function ProfilePage({
    params,
    searchParams,
}: {
    params: { author: string };
    searchParams?: searchParamsType;
}) {
    return (
        <main className="profile-page">
            <div className="user-info">
                <Container>
                    <ProfileBanner author={params.author} />
                </Container>
            </div>
            <Container>
                <AuthorArticlesSection author={params.author} searchParams={searchParams} />
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

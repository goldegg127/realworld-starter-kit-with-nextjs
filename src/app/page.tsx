import { searchParamsType } from '@/types';
import { AllAriticlesSection, AllTagList } from '@/components/main';

export default function MainPage({ searchParams }: { searchParams?: searchParamsType }) {
    return (
        <main className="home-page">
            <section className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </section>
            <section className="container page">
                <div className="row">
                    <section className="col-md-9">
                        <AllAriticlesSection searchParams={searchParams} />
                    </section>
                    <aside className="col-md-3">
                        <article className="sidebar">
                            <p>Popular Tags</p>
                            <AllTagList />
                        </article>
                    </aside>
                </div>
            </section>
        </main>
    );
}

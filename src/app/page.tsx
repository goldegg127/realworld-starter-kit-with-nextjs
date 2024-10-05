import { searchParamsType } from '@/types';
import { MainBanner, AllAriticlesSection, Sidebar } from '@/components/main';

export default function MainPage({ searchParams }: { searchParams?: searchParamsType }) {
    return (
        <main className="home-page">
            <MainBanner />
            <section className="container page">
                <div className="row">
                    <section className="col-md-9">
                        <AllAriticlesSection searchParams={searchParams} />
                    </section>
                    <aside className="col-md-3">
                        <Sidebar />
                    </aside>
                </div>
            </section>
        </main>
    );
}

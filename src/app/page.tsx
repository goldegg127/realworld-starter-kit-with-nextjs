import Banner from '@/components/home/Banner';
import ArticleList from '@/components/home/ListSection';
import Sidebar from '@/components/home/Sidebar';

export default function Home({
    params,
    searchParams,
}: {
    params?: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    return (
        <main className="home-page">
            <Banner />
            <section className="container page">
                <div className="row">
                    <section className="col-md-9">
                        <ArticleList searchParams={searchParams} />
                    </section>
                    <aside className="col-md-3">
                        <Sidebar />
                    </aside>
                </div>
            </section>
        </main>
    );
}

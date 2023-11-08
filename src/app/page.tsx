import Banner from "@/components/home/Banner";
import List from "@/components/home/ListSection";
import Sidebar from "@/components/home/Sidebar";

export default function Home() {
  return (
    <main className="home-page">
      <Banner />
      <section className="container page">
        <div className="row">
          <section className="col-md-9">
            <List />
          </section>
          <aside className="col-md-3">
            <Sidebar />
          </aside>
        </div>
      </section>
    </main>
  );
}

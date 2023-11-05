import Banner from './main/Banner';
import List from './main/ListSection';
import Sidebar from './main/Sidebar';

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
  )
}

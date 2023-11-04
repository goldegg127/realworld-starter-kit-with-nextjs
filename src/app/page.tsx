import Banner from './list-page/banner'
import Sidebar from './list-page/sidebar'
import List from './list-page/listSection';

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

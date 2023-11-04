import Pagination from "./pagination";
import Items from './articles';

async function getData() {
    const res = await fetch('https://api.realworld.io/api/articles');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
}

export default async function List() {
    const data = await getData();
    const pageArticles = data.articles.slice(0, 10);

    return (
        <>
            <nav className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="">Your Feed</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link active" href="">Global Feed</a>
                    </li>
                </ul>
            </nav>
            <Items pageArticles={pageArticles} />
            <Pagination />
        </>
    );
}
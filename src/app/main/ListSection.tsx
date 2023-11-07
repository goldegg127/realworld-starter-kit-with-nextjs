import ArticleFeeds from "./ArticleFeeds";
import { Articles } from "@/app/type/index";

async function fetchArticles() {
  const res = await fetch("https://api.realworld.io/api/articles");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function List() {
  const data = await fetchArticles();
  const { articles, articlesCount } : {
    articles: Articles;
    articlesCount: number;
  } = data;
  
  return (
    <>
      <nav className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {/* 로그인 기능 구현 후 적용
            <li className="nav-item">
                <a className="nav-link" href="">Your Feed</a>
            </li> */}
          <li className="nav-item">
            <a className="nav-link active" href="">
              Global Feed
            </a>
          </li>
        </ul>
      </nav>
      <ArticleFeeds articles={articles} articlesCount={articlesCount} />
    </>
  );
}

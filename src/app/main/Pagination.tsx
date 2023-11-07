"use client";

import { Articles } from "@/app/type/index";

export default function Pagination({ articles, currentPage,  articlesCount }: { 
  articles: Articles;
  currentPage: number;
  articlesCount: number;
}) {
  const getPageNums = (): number[] => {
    const totalPageNum = Math.ceil(articles.length / 10);
    const pageNums = [];

    for (let pageNum = 1; pageNum < totalPageNum + 1; pageNum++) {
      pageNums.push(pageNum);
    }

    return pageNums;
  }

  return (
    <ul className="pagination">
     {getPageNums().map(pageNum => {
      return(
        <li key={pageNum} className={`page-item ${pageNum === currentPage && "active"}`}>
          <a className="page-link" href={`?page=${pageNum}`}>
            {pageNum}
          </a>
        </li>
      )})}
    </ul>
  );
}

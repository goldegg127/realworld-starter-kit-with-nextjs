"use client";
import { useSearchParams } from "next/navigation";

export default function Pagination({ pageNum }: { pageNum: number }) {
  const searchParams = useSearchParams();
  const currentPage: string = searchParams.get("page") ?? "1";
  return (
    <ul className="pagination">
      <li className={`page-item ${"active"}`}>
        <a className="page-link" href={`?page=${3}`}>
          {currentPage}
        </a>
      </li>
    </ul>
  );
}

import Link from 'next/link';

const getPageNums = (articlesCount: number): number[] => {
    const totalPageNum = Math.ceil(articlesCount / 10);
    const pageNums = [];

    for (let pageNum = 1; pageNum < totalPageNum + 1; pageNum++) {
        pageNums.push(pageNum);
    }

    return pageNums;
};

export default function Pagination({ currentPage, articlesCount }: { currentPage: number; articlesCount: number }) {
    return (
        <ul className="pagination">
            {getPageNums(articlesCount).map((pageNum, index) => {
                return (
                    <li key={`page-${pageNum}-${index}`} className={`page-item ${pageNum === currentPage && 'active'}`}>
                        <Link className="page-link" href={`?page=${pageNum}`}>
                            {pageNum}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

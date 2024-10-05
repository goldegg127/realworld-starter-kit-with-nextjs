import Link from 'next/link';
import { searchParamsType } from '@/types';

const getPageNums = (articlesCount: number): number[] => {
    const totalPageNum = Math.ceil(articlesCount / 10);
    const pageNums = [];

    for (let pageNum = 1; pageNum < totalPageNum + 1; pageNum++) {
        pageNums.push(pageNum);
    }

    return pageNums;
};

export default function Pagination({
    currentPage,
    articlesCount,
    searchParams = {},
}: {
    currentPage: number;
    articlesCount: number;
    searchParams?: searchParamsType;
}) {
    // searchParams에서 undefined 값을 제거하고 새로운 객체로 변환
    const filteredSearchParams = Object.entries(searchParams)
        .filter(([_, value]) => value !== undefined) // undefined 값 제거
        .reduce((acc, [key, value]) => {
            acc[key] = value as string; // value는 string으로 처리
            return acc;
        }, {} as Record<string, string>);

    return (
        <ul className="pagination">
            {getPageNums(articlesCount).map((pageNum, index) => {
                // 기존 쿼리 파라미터에 page를 추가
                const updatedSearchParams = new URLSearchParams(filteredSearchParams); // searchParams를 URLSearchParams로 변환
                updatedSearchParams.set('page', pageNum.toString()); // page 파라미터 추가

                return (
                    <li
                        key={`page-${pageNum}-${index}`}
                        className={`page-item${pageNum === currentPage ? ' active' : ''}`}>
                        <Link className="page-link" href={`?${updatedSearchParams.toString()}`}>
                            {pageNum}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

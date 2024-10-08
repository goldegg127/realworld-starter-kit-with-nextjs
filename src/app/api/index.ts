import { NEXT_API } from '@/config';
import { ArticlesApiParam } from '@/types';

export async function fetchArticles({
    offset = 0,
    limit = 10,
    tag = '',
    author = '',
    favorited = '',
}: ArticlesApiParam) {
    try {
        const url = `${NEXT_API.ARTICLES}?offset=${offset}&limit=${limit}${tag ? `&tag=${tag}` : ''}${
            author ? (favorited ? `&favorited=${favorited}` : `&author=${author}`) : ''
        }`;

        const res = await fetch(url);

        // 500 에러를 처리하는 로직
        if (!res.ok) {
            console.error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch Articles data: ${res.status} ${res.statusText}`);
        }

        const text = await res.text();
        if (!text) {
            throw new Error('Received empty response from API');
        }

        // 응답을 JSON으로 변환
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error; // 에러를 다시 던져 상위 로직에서 처리할 수 있도록 함
    }
}

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

        if (!res.ok) {
            console.error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch Articles data: ${res.status} ${res.statusText}`);
        }

        const text = await res.text();
        if (!text) {
            throw new Error('Received empty response from API');
        }

        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

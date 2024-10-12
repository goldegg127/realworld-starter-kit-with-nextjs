import { NEXT_API, END_POINT } from '@/config';
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

export async function fetchArticleDetails(slug: string) {
    const res = await fetch(`${NEXT_API.ARTICLES}/${slug}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch for article details: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchComments(slug: string) {
    const res = await fetch(`${NEXT_API.ARTICLES}/${slug}/${END_POINT.COMMENTS}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch comments: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchProfiles(username: string) {
    const res = await fetch(`${NEXT_API.PROFILES}/${username}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchTagList() {
    const res = await fetch(NEXT_API.TAGS);

    if (!res.ok) {
        throw Error(`failed fetching tag list: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

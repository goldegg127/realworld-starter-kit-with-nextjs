import API from '@/config';
import { ArticlesApiParam } from '@/type';

export async function fetchArticles({
    offset = 0,
    limit = 10,
    tag = '',
    author = '',
    favorited = '',
}: ArticlesApiParam) {
    const url = `${API.ARTICLES}?offset=${offset}&limit=${limit}${tag ? `&tag=${tag}` : ''}${
        author ? (favorited ? `&favorited=${favorited}` : `&author=${author}`) : ''
    }`;

    console.log(url);

    const res = await fetch(url, {
        cache: 'force-cache',
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch Articles data: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchDetails(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch for article details: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchComments(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}/comments`);

    if (!res.ok) {
        throw new Error(`Failed to fetch comments: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchProfiles(username: string) {
    const res = await fetch(`${API.PROFILES}/${username}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchTagList() {
    const res = await fetch(API.TAGS);

    if (!res.ok) {
        throw Error(`failed fetching tag list: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function loginUser({ email, password }: { email: string; password: string }) {
    const url = `${API.USERS}/login`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: { email, password },
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to login: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

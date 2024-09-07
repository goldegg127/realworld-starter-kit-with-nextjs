import API from '@/config';

export async function fetchArticles({
    offset = 0,
    limit = 10,
    tag = '',
}: {
    offset?: number;
    limit?: number;
    tag: string;
}) {
    const url = `${API.ARTICLES}?offset=${offset}&limit=${limit}${tag ? `&tag=${tag}` : ''}`;
    const res = await fetch(url, {
        cache: 'no-store',
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch Articles data: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();

    console.log('========================================= Fetched Articles:', result);
    console.log('========================================= Fetched Articles offset:', offset);
    console.log('========================================= Fetched Articles tag:', tag);

    return result;
}

export async function fetchDetails(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}`);

    if (!res.ok) {
        throw new Error(`failed to fetch for article details: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchComments(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}/comments`);

    if (!res.ok) {
        throw new Error(`failed to fetch comments: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchProfile(username: string) {
    const res = await fetch(`${API.PROFILES}/${username}`);

    if (!res.ok) {
        throw new Error(`failed to fetch profile: ${res.status} ${res.statusText}`);
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

import API from '@/config';

export async function fetchArticles() {
    const res = await fetch(API.ARTICLES);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function fetchDetails(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}`);

    if (!res.ok) {
        throw new Error('failed to fetch for article details');
    }

    return res.json();
}

export async function fetchComments(slug: string) {
    const res = await fetch(`${API.ARTICLES}/${slug}/comments`);

    if (!res.ok) {
        throw new Error('failed to fetch comments');
    }

    return res.json();
}

export async function fetchProfile(username: string) {
    const res = await fetch(`${API.PROFILES}/${username}`);

    if (!res.ok) {
        throw new Error('failed to fetch profile');
    }

    return res.json();
}

export async function fetchTagList() {
    const res = await fetch(API.TAGS);

    if (!res.ok) {
        throw Error('failed fetching tag list');
    }

    return res.json();
}

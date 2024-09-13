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

export async function postComment({
    slug,
    commentBody,
    token,
}: {
    slug: string;
    commentBody: string;
    token: string | null;
}) {
    const url = `${API.ARTICLES}/${slug}/comments`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            comment: { body: commentBody },
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to post your comment: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function deleteComment({
    slug,
    commentId,
    token,
}: {
    slug: string;
    commentId: number;
    token: string | null;
}) {
    const url = `${API.ARTICLES}/${slug}/comments/${commentId}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete your comment: ${res.status} ${res.statusText}`);
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

export async function SignupUser({ username, email, password }: { username: string; email: string; password: string }) {
    const url = `${API.USERS}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: { username, email, password },
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to signup: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

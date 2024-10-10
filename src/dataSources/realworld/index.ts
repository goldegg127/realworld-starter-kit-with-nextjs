import { REALWORLD_API, END_POINT } from '@/config';
import { ArticlesApiParam } from '@/types';

export async function fetchArticlesFromRealworld({
    offset = 0,
    limit = 10,
    tag = '',
    author = '',
    favorited = '',
}: ArticlesApiParam) {
    const url = `${REALWORLD_API.ARTICLES}?offset=${offset}&limit=${limit}${tag ? `&tag=${tag}` : ''}${
        author ? (favorited ? `&favorited=${favorited}` : `&author=${author}`) : ''
    }`;

    const res = await fetch(url, {
        cache: 'force-cache',
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch Articles data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchArticleDetails(slug: string) {
    const res = await fetch(`${REALWORLD_API.ARTICLES}/${slug}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch for article details data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function postArticleDetails(
    { title, description, body, tagList }: { title: string; description: string; body: string; tagList: string[] },
    token: string,
) {
    const res = await fetch(`${REALWORLD_API.ARTICLES}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            article: {
                title,
                description,
                body,
                tagList,
            },
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to post for your article data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function updateArticleDetails(
    slug: string,
    { title, description, body }: { title: string; description: string; body: string },
    token: string,
) {
    const res = await fetch(`${REALWORLD_API.ARTICLES}/${slug}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            article: {
                title,
                description,
                body,
            },
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to update for your article data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function deleteArticleDetails(slug: string, token: string) {
    const res = await fetch(`${REALWORLD_API.ARTICLES}/${slug}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to post for your article data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchComments(slug: string) {
    const res = await fetch(`${REALWORLD_API.ARTICLES}/${slug}/${END_POINT.COMMENTS}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch comments data from RealWorld: ${res.status} ${res.statusText}`);
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
    const url = `${REALWORLD_API.ARTICLES}/${slug}/${END_POINT.COMMENTS}`;
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
        throw new Error(`Failed to post your comment data from RealWorld: ${res.status} ${res.statusText}`);
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
    const url = `${REALWORLD_API.ARTICLES}/${slug}/${END_POINT.COMMENTS}/${commentId}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete your comment data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchProfiles(username: string) {
    const res = await fetch(`${REALWORLD_API.PROFILES}/${username}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch profile data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchTagListFromRealworld() {
    const res = await fetch(REALWORLD_API.TAGS);

    if (!res.ok) {
        throw Error(`failed fetching tag list data from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function loginUser({ email, password }: { email: string; password: string }) {
    const url = `${REALWORLD_API.USERS}/${END_POINT.LOGIN}`;

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
        throw new Error(`Failed to login from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function signupUser({ username, email, password }: { username: string; email: string; password: string }) {
    const url = `${REALWORLD_API.USERS}`;

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
        throw new Error(`Failed to signup from RealWorld: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

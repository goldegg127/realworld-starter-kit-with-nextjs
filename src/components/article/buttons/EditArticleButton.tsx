'use client';

import { useRouter } from 'next/router';

export default function EditArticleButton({ slug }: { slug: string }) {
    const router = useRouter();

    const redirectToEditor = () => {
        router.push({
            pathname: '/editor',
            query: { slug },
        });
    };

    return (
        <button className="btn btn-sm btn-outline-secondary" onClick={redirectToEditor}>
            <i className="ion-edit"></i> Edit Article
        </button>
    );
}

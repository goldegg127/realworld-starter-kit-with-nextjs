'use client';

import { useEffect } from 'react';
import { Article } from '@/type';
import { useArticleStore, useAuthStore } from '@/stores';

export default function ArticleGlobalStateUpdater({ article }: { article: Article }) {
    const { setTitle, setDescription, setBody, setTagList } = useArticleStore();
    const { slug, title, description, body, tagList, author }: Article = article;
    const { token, userInfo } = useAuthStore();

    useEffect(() => {
        if (token && userInfo?.username === author?.username) {
        }
        setTitle(title);
        setDescription(description);
        setBody(body);
        setTagList(tagList);
    }, []);

    return <></>;
}

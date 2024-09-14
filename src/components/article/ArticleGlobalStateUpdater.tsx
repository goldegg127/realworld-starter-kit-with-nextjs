'use client';

import { useEffect } from 'react';
import { Article } from '@/type';
import { useArticleStore, useAuthStore } from '@/stores';

export default function ArticleGlobalStateUpdater({ article }: { article: Article }) {
    const { setTitle, setDescription, setBody, setTagList } = useArticleStore();
    const { slug, title, description, body, tagList, author }: Article = article;
    const { token, userInfo } = useAuthStore();

    useEffect(() => {
        /**
         * @todo 개발 완료 후 주석의 조건문 적용
         * if (token && userInfo?.username === author?.username) {
        }**/
        setTitle(title);
        setDescription(description);
        setBody(body);
        setTagList(tagList);
    }, []);

    return <></>;
}

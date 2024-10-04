'use client';

import { syncDetailsWithSupabase, fetchDetailsFromSupabase } from '@/api/supabase';
import { Article } from '@/type';
import { useInputStates } from './useInputStates';

function useGetArticle({
    slug,
    setTitle,
    setDescription,
    setBody,
    setTagList,
    setErrorMessage,
    setAuthorName,
}: ReturnType<typeof useInputStates> & { slug: string }) {
    const getArticle = async () => {
        await syncDetailsWithSupabase(slug);

        const { article } = await fetchDetailsFromSupabase(slug);

        if (!article) {
            setErrorMessage('Unable to retrieve article information.');
        }

        const { title, description, body, tagList, author }: Article = article;

        setTitle(title);
        setDescription(description);
        setBody(body);
        setTagList(tagList);
        setAuthorName(author.username);
    };

    return { getArticle };
}

export { useGetArticle };
